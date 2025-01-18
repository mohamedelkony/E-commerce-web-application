provider "aws" {
  region = "us-west-1"
}

resource "aws_instance" "jenkins_controller" {
  ami                         = "ami-0657605d763ac72a8"
  instance_type               = "t2.micro"
  availability_zone           = "us-west-1a"
  subnet_id                   = "subnet-0576347d1a502e38d" # TODO create a private subnet as part of infrastructure deployment and use it here for jenkins agents
  associate_public_ip_address = true
  key_name                    = "Jenkins_agent_EC2"

  root_block_device {
    volume_type           = "gp3"
    volume_size           = 8
    delete_on_termination = true
  }

  vpc_security_group_ids = [aws_security_group.allow_ssh_http_https.id]

  user_data = <<-EOF
              #!/bin/bash
              echo "Instance just started!" > ~/ec2-user/juststarted.txt
              EOF

  tags = {
    Name = "jenkins_agent_EC2"
  }
  provisioner "local-exec" {
    command = "echo ${self.public_ip} > public_ip.txt"
  }
}

output "jenkins_public_ip" {
  value = aws_instance.jenkins_controller.public_ip
}

resource "aws_security_group" "allow_ssh_http_https" {
  name_prefix = "allow_ssh_http_https"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
