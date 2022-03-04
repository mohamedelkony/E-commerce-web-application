# Robust e-commerce web application using node.js, express.js & postgresql and vanillia js

*User authentication and authorization using JWT.
*Full fledged amdin panel that allows adding new products ,editing
properites of current inventory or removing a product.
*Implement users shopping cart that allows adding ,removing  items and change each item quantity.
*Strong negative and postive integrated and unit tests for all API end points using chai and jasmine.
*Implement ACID database transction from cart items into a new order
asserting cart items quantity is avaialbe in invnetory and adjusting it if not. 
*Searching of products using part of product name and/or product description and/or min and max price.
*Frontend is implemented in vanillia JS (CSS is resposive)    
used fetch/xhr requests instead of server rendring for fast page retrival.
*using prepared stataments to prevent SQL injection.
*Upload prdoucts images dynamically and saving them in server local file system instead of using CDN.

*deploying website to heroku live at [link]
(https://morning-wildwood-44476.herokuapp.com/)
# Integrated tests
![tests](https://github.com/mohamedelkony/convFourier/blob/master/readme_photos/tests.png?raw=true)

# database Entity-Relationship model
![er](https://github.com/mohamedelkony/convFourier/blob/master/readme_photos/er.png?raw=true)

# server logs
![logs](https://github.com/mohamedelkony/convFourier/blob/master/readme_photos/server_logs.png?raw=true)
# server siege under 30 concurrent users
![siege](https://github.com/mohamedelkony/convFourier/blob/master/readme_photos/siege.png?raw=true)
