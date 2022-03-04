--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Ubuntu 14.2-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.2 (Ubuntu 14.2-1.pgdg20.04+1)

-- Started on 2022-02-28 03:41:17 EET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3369 (class 0 OID 16397)
-- Dependencies: 210
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory (id, product_name, price, product_desc, quantity) FROM stdin;
31	Dumbbell Set, 6 In 1 Adjustable Weights Dumbbells Sets, Barbell Set with Connecting Rod for Adults Women Men Workout Fitness,Home Gym Exercise Training Equipment	600.00	Seven in one: a dumbbell set allows you to exercise versatile. Dumbbells can be used to sculpt your arms, while setting weights lets you practice deadly lifting or squatting This product is ideal for improving overall health or encouraging weight loss. It also helps strengthen the upper body and essential muscles and lower body. The adjustable design makes it easy to maintain fitness at home, office, gym. Adjustable Weight: Dumbbell and Kettle Weights are adjustable, you can customize the weight setting freely to meet your training needs. ERGONOMIC DESIGN: The connection rod is covered with foam to ensure a comfortable grip, while the dumbbell handle is rubberized to prevent easy slipping from hand. SAFE & STABLE: each double layer dumbbell handle, solving the issue of falling out and unlocking the heavy disc during fitness. HEALTH AND FITNESS: Helps train and strengthen the quad thigh, buttocks, abdomen, biceps and triceps muscles, legs and knees at home or at the gym. With active lip-burning fitness equipment, body shaping has never been so easy. Excellent Material: Made of high quality raw materials, it is heat resistant, very durable and has a long service life.	0
33	code	12.00	sercert code secret code	0
34	code 21	6.00	sercert code s12 ecret code	0
32	Starbucks Dolce Gusto Cappuccino 12 Capsules	9.00	Brand: Starbucks Formats: Capsules Type: Caffeinated Sub Type: Cappuccino Type: Medium Size: 120 gm Packaging: Box	0
30	book	12.00	good book	2
29	water bottle	45.00	blastic water bottle	1
\.


--
-- TOC entry 3371 (class 0 OID 16407)
-- Dependencies: 212
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, email, birthdate, gender) FROM stdin;
1	test1645476049	$2b$10$a/jcn4KMvEMVhN2a7vPBZOZz7rJhkpY4wjSUfCMs6loWNvgO18byW	test1645476049@gmail.com	2022-02-21	male
2	test1645476123	$2b$10$AIIF7khnFhbja15qEflgvO1z4B9KDCVSvhCFPmOgo2J0i.zaSKf0y	test1645476123@gmail.com	2022-02-21	male
3	test1645476402	$2b$10$1fJcYEdXNc39Tr1mtEaD0e97zOkNydL2gH.GHeuooadDAOaDGD8NW	test1645476402@gmail.com	2022-02-21	male
4	test1645476509	$2b$10$RfC3Buu.iFwRiSlp7v1rO.gOy8ovKgQTiUA4nOXKI7Vc6HIapbaeS	test1645476509@gmail.com	2022-02-21	male
5	test1645477532	$2b$10$8pzgVCDnAbU02LhrLYtIzOdy8.ihzD1c4s2U/M1MiFLVE0FANVSrm	test1645477532@gmail.com	2022-02-21	male
6	momomkony	$2b$10$0Xf4Cfi5d6o3YuG9pxLnS.FmoZV0po75mcHOygjaFRYs9l7k9FoVG	konykony2112@gmail.com	1998-08-12	male
7	test1645646651	$2b$10$7/tlQ3dmfLyq2zWIfnFEs.DMbOwzC5n5NrrSCR2fUoEO4oTfGjyXO	test1645646651@gmail.com	2022-02-23	male
8	test1645646829	$2b$10$JqUG5M8wHZeaOVKG2j7o5OupLXzIdIbxMtTEJ1Yqwq1LO6CWveLXu	test1645646829@gmail.com	2022-02-23	male
9	test1645647309	$2b$10$cbODoP.6K.PthvXLg/jMA.olblv/SSMPduKgeTtKv4A1nepXyMuI.	test1645647309@gmail.com	2022-02-23	male
10	test1645648261	$2b$10$duYTcCcpOj.lzf/9lrFV7eBCrbYQUdL7.QoCrVeZAMHXLEbVqaTgy	test1645648261@gmail.com	2022-02-23	male
11	test1645648498	$2b$10$K2GIDCuHu2AdNyY4KzzS0OGX18wpVYHyzQwAB.FJYxavqfWoCvvVS	test1645648498@gmail.com	2022-02-23	male
12	test1645648498	$2b$10$yYshaT4DRz9.2Posloiiv.kZ/jykfLZthgwxms3Yn/zznOyhSr0HO	test1645648498@gmail.com	2022-02-23	male
13	test1645648581	$2b$10$YbCtNbz9LlAhVBgy11CgI.LllP2RjkOLMS2Oj0WhePfEEnq2qYsCC	test1645648581@gmail.com	2022-02-23	male
14	test1645648698	$2b$10$.ZPI13tEMssUADiGaqJ1wedDBpnyd7.w92jtlsCNyv1YtxQA2qbI6	test1645648698@gmail.com	2022-02-23	male
15	test1645649277	$2b$10$WF4p.LtsBpkzaC2G/1by6uNWWUsqhVho8vJR0kFmb8cNH96QnxLGS	test1645649277@gmail.com	2022-02-23	male
16	test1645649354	$2b$10$0igvTgLgLv7asSbZBhgPz.eO8zuuVCP6loFpwJM9N/Bvb5RFvGeYu	test1645649354@gmail.com	2022-02-23	male
17	test1645649415	$2b$10$Ek0CJ8sQGm/jYl3hNw.Jp.X4JDI0yrV/IAgdxlhw/uFRPEXFRF8Ne	test1645649415@gmail.com	2022-02-23	male
18	test1645649872	$2b$10$9yfudoWpzEAPZImZBFSZceQqwlTOX.gn8LFh7zm8e3GKHhC1.UA9q	test1645649872@gmail.com	2022-02-23	male
19	test1645650116	$2b$10$VATfE0lU08MDrJqLSVjtsumxNLI2UZWHBAFe9kor8V4oFnhhDxAVC	test1645650116@gmail.com	2022-02-23	male
20	test1645650557	$2b$10$vxPqRgHnp0rTBFhWINMQCuJ67mEIL3W17KWXlU5emvc/zMRMF6aSm	test1645650557@gmail.com	2022-02-23	male
21	test1645651217	$2b$10$HXbhhCm9LH00bxqDnl5HbeAIa6PHYyPXQs3aU3l7tBC9ZAzjTpG4u	test1645651217@gmail.com	2022-02-23	male
22	fake_test_user1	$2b$10$95CTCkkX1bbHVmGYMqt9f.ZqMURTZEDzJReuX4Oa3GN8oCvFtkWS.	fake_test_user1@gmail.com	1998-08-12	male
23	test1645651451	$2b$10$WlgR.lCmzYhBxPYIGE6NbOClPghvsddVDXrDJ.L313pOgKXHNgETa	test1645651451@gmail.com	2022-02-23	male
24	test1645655656	$2b$10$jZLAlB5xAVQ9olyG2X6BIuMNj1fGBrvxONyqPKt3rqXaeqiY.xWzy	test1645655656@gmail.com	2022-02-23	male
25	test1645655979	$2b$10$ph5feS3WxY2WyUls6XtJWehkRSAS59tMHfktBHlCtqdX9FK8UsKK.	test1645655979@gmail.com	2022-02-23	male
26	test1645655979	$2b$10$clbyL6Qiq1GzsBGwfSAfcOdHHolVhWZuiD4Tk2TWh9fBdjXO3UKbC	test1645655979@gmail.com	2022-02-23	male
27	test1645656099	$2b$10$.g5c4Z.GHL53KNC5I2SVzOmWO8lkKpByB27wNc76qrNH1PncVQ/ae	test1645656099@gmail.com	2022-02-23	male
28	test1645656099	$2b$10$MyAMuwSTZprjNzE3KNAt/e.gGp.0toTCD56stzMK2Fy9HcPDNpvOO	test1645656099@gmail.com	2022-02-23	male
29	test1645657150	$2b$10$gLo22BkcyNZWwjp.dMrb5ueqg6pPkrGVrZzEOh1oFZaW3Z86sHjVW	test1645657150@gmail.com	2022-02-23	male
30	test1645657661	$2b$10$FXqSxe4QfSKlC0K2ak1h6eO0EDdcdMC1n./fQGONXxtmCqkyoR47K	test1645657661@gmail.com	2022-02-23	male
31	test1645657829	$2b$10$sCRSNkorDf9SsmHl6JAeuO1SwERaM5g28.DYks6AOQlhwwf/uopEy	test1645657829@gmail.com	2022-02-23	male
32	test1645714590	$2b$10$4uH4fnv4nkvy4g.wUj4pwOFZEuhG9J0BrfX5q/EqQY46Vn8AYUm6O	test1645714590@gmail.com	2022-02-24	male
33	test1645715312	$2b$10$Klgu4TmCfqbF2h.L.HWHC.s7jBTWpAgCXFZVHgnr2NhrGI6mFu5.6	test1645715312@gmail.com	2022-02-24	male
34	test1645716237	$2b$10$hS4qn3e5Q4cJ6W0yEfSVzO00TLSpXNI8dWmq/Qut4M5MFyfxp0DlC	test1645716237@gmail.com	2022-02-24	male
35	test1645716829	$2b$10$.7maLdu7Nhjn.E8Biltvyuu2xDi5Kx4H2zCgB59L8u7MyF9/WN4Zy	test1645716829@gmail.com	2022-02-24	male
36	test1645716900	$2b$10$DAvjr9Q.B3jV38K.boI.Iek7IbCc59.1F1CGl/T9KpWzfjjAmrgZu	test1645716900@gmail.com	2022-02-24	male
37	test1645717085	$2b$10$1guXP34kW4T0hdw4m5CPoOw9V/TuimLpUPoUReVWGKM1T1HRZ9Xza	test1645717085@gmail.com	2022-02-24	male
38	test1645721157	$2b$10$V5f86aHEeB5897tjjG3ckuPCw96Yq7UVk.F9dNSdAHGkOZZroQYgy	test1645721157@gmail.com	2022-02-24	male
39	test1645721183	$2b$10$znpLg0xVv9hIL28ybL8oV.8pD8r4snKCVw0XqoJO1BwZhjXWKEsIK	test1645721183@gmail.com	2022-02-24	male
40	test1645725963	$2b$10$.rSF5s8lFy50YYn/Sl7g5.Q4GIJq0joMO7nhye12qvyW2XJOljeB2	test1645725963@gmail.com	2022-02-24	male
41	Realme6	$2b$10$aq1ioCxQgvxoqujxX2kxZeGTLmiFkbMHO1SH1jVOtIEhgppKwWQkm	ko6nykony22@gmail.com	1998-08-12	male
42	u	$2b$10$8NCC4/W3k/t3iZL57PmsG.CUEMw0UjonSv34B3BplJj/Vd4wXzOqi	u@gmail.com	1998-08-12	male
\.


--
-- TOC entry 3377 (class 0 OID 16522)
-- Dependencies: 218
-- Data for Name: carts_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts_items (id, product_id, user_id, quantity) FROM stdin;
\.


--
-- TOC entry 3373 (class 0 OID 16423)
-- Dependencies: 214
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, status, total_price) FROM stdin;
4	22	shipping	7.00
5	22	shipping	12.00
6	22	shipping	45.00
7	22	shipping	45.00
8	22	shipping	0.00
9	22	shipping	12.00
10	22	shipping	12.00
11	22	shipping	12.00
12	22	shipping	624.00
13	41	shipping	27.00
14	22	shipping	9.00
15	22	shipping	57.00
16	6	shipping	45.00
\.


--
-- TOC entry 3379 (class 0 OID 16543)
-- Dependencies: 220
-- Data for Name: orders_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_items (id, order_id, product_id, quantity) FROM stdin;
5	5	30	1
6	6	29	1
7	7	29	0
8	9	30	0
9	10	30	0
10	11	30	5
11	12	30	1
12	12	31	1
13	12	33	1
14	13	30	1
15	13	34	1
16	13	32	1
17	14	32	0
18	15	29	1
19	15	30	3
20	16	29	5
\.


--
-- TOC entry 3375 (class 0 OID 16467)
-- Dependencies: 216
-- Data for Name: products_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_images (id, url, its_product_id, image_name) FROM stdin;
15	/public/dynamic/1645716830330.jpeg	\N	\N
16	/public/dynamic/1645716900916.jpeg	\N	\N
17	/public/dynamic/1645717098747.jpeg	\N	\N
18	/public/dynamic/1645721160230.jpeg	\N	\N
19	/public/dynamic/1645721184061.jpeg	\N	\N
20	/public/dynamic/1645725963607.jpeg	\N	\N
21	/public/dynamic/1645824990274.jpeg	\N	\N
22	/public/dynamic/1645825309515.jpeg	29	\N
23	/public/dynamic/1645825575125.jpg	30	\N
24	/public/dynamic/1645885236802.jpg	31	\N
25	/public/dynamic/1645885658053.jpg	32	\N
26	/public/dynamic/1645886089991.png	33	\N
27	/public/dynamic/1645886115237.png	34	\N
\.


--
-- TOC entry 3380 (class 0 OID 24581)
-- Dependencies: 221
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session (sid, sess, expire) FROM stdin;
wYk7bT3epbr1arHu0Q5Qzivpk2wr6yWc	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T14:56:31.536Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 16:56:32
phNEsMnMj8s9BnoG0huraWiwqwPhzg_9	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T23:10:29.602Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 01:10:31
mjORgONQKV8ndidgqag5tfFb_KGCc0D3	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T22:42:18.902Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 00:42:20
x3XlwGHmGg5In37bmFDXUpCTjzZKYy84	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T22:42:56.266Z","httpOnly":true,"path":"/"},"user_id":27}	2022-03-03 00:42:57
RZmlzq0D0VywFkduYd5ASINSA2dfsqtp	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T22:42:56.220Z","httpOnly":true,"path":"/"},"user_id":27}	2022-03-03 00:42:57
iPCkpphHVWC4IJ2TNKZj3sChGnIfkoTF	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T22:34:16.095Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 00:34:17
X6uoBuplbK5cTotL1U9ekm_9jtKiv03J	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T14:56:44.431Z","httpOnly":true,"path":"/"},"user_id":32}	2022-03-03 16:56:45
iJINNgO6VChADH2tab5Q7HnT2WHPvvYC	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T22:34:17.024Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 00:34:18
AYsuBO77Q-TmgZRIRMB97yBzIbIUE1X0	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T22:34:18.685Z","httpOnly":true,"path":"/"},"user_id":24}	2022-03-03 00:34:19
xZ5m3U_CFxRERc22zYZMNN4QJUw1bfF9	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T23:07:41.134Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 01:07:42
M7A4D7uPKyXU_bsDB__j2_AvH7OAaVrl	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T23:10:30.964Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 01:10:32
hK6Ylwd2A3ZoESbEjsgiicHRXZB9bfR4	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T23:13:18.264Z","httpOnly":true,"path":"/"},"user_id":31}	2022-03-03 01:13:19
eHiQPATKuBCmoXNTRKFH5fOPoNuVkRSC	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T22:39:39.734Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 00:39:41
1eeC8Kf_ocBKrFC-lrQln-tLG9DoE-bk	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T22:59:10.133Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 00:59:11
Y2bZjMzV9FBiz4okb6B0wZUJ2Ot5Q-3D	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T15:08:34.580Z","httpOnly":true,"path":"/"},"user_id":33}	2022-03-03 17:08:35
qv64CDQbrwRyw3ranY_OZOb3EjuLx9Jb	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T23:07:42.202Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 01:07:43
-Hz-HEs6Bg8MVrg_YeKn_MrCTnzHCzBM	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T22:39:40.527Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 00:39:41
2ZGIo8IZDCFwGTyYIfJWu_teuSw2tmfc	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T22:42:17.277Z","httpOnly":true,"path":"/"},"user_id":25}	2022-03-03 00:42:18
Ak06xJqUo-mvHej3ZewegtEc70bTf_1j	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T22:42:17.286Z","httpOnly":true,"path":"/"},"user_id":25}	2022-03-03 00:42:18
20aJfKw0W69oBRAQG2rrWMrdUNLh_x10	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T22:42:17.255Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 00:42:18
qucTGAp2uVCECCalA1oAAeJYFJwpIvFx	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T23:07:44.052Z","httpOnly":true,"path":"/"},"user_id":30}	2022-03-03 01:07:45
yBbd2I8ZIaihkz9ICocu85Roo0hQwU4f	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T22:59:11.243Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 00:59:12
Mxm4WdvEDrEfRr8L6bQsQKvp1zt8hFch	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-02T22:59:13.312Z","httpOnly":true,"path":"/"},"user_id":29}	2022-03-03 00:59:14
HMxgzO_KbVLbxVO-uYBQ27baJOcRi6P9	{"cookie":{"originalMaxAge":604799999,"expires":"2022-03-03T15:23:58.790Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 17:24:00
nixPnr8mfF86R7fyTrBDt6GOerzYameA	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T15:08:32.325Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 17:08:34
IEnKE7ZC94o8P7SMhuBh_Y2L3VOCHlh5	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T14:56:30.162Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 16:56:31
cHTh3m_pLWTlEg8Vxmgcrl_k8ldi7fOV	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T15:23:59.501Z","httpOnly":true,"path":"/"},"user_id":34}	2022-03-03 17:24:00
nUyu8AArZTLlFWS1Xz0G7EbDb7-Kfl9_	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-06T23:38:33.305Z","httpOnly":true,"path":"/"},"user_id":42}	2022-03-07 01:38:51
W-n40CoXvqJ_M9vWZ8mukwxOZI0nGDjO	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T15:23:57.716Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 17:23:59
_ByCQa1XIVoX-78D2CGf0nN1rLfuT7qv	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T15:08:33.780Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 17:08:35
66FrJMNiGrPzjJltJlRHrIaa4LkL_S2O	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T15:34:59.941Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 17:35:01
x0KLHP1aWTQwh0y--haqJxfinELojfl9	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T15:33:50.731Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 17:33:52
pKS2xnwSPM3PCTsBcMAcz2fuiJ7wSr4x	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T15:33:49.596Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 17:33:51
sQtzmm7mRoFi25DkXSs5p9RnOWI8wM2G	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T15:33:51.623Z","httpOnly":true,"path":"/"},"user_id":35}	2022-03-03 17:33:52
kpLtdd5OlWOIa7P7F26g-1THsA-wtCPl	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T15:35:01.256Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 17:35:02
cmr85_IeOWIKpvagkaMW0FzgTgpDXCmN	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T15:35:02.098Z","httpOnly":true,"path":"/"},"user_id":36}	2022-03-03 17:35:03
AXAHk2M6vyedkxbmzw_yXFLWIYeXLJXr	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T15:38:19.175Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 17:38:20
SpEObslEQmXIVSdcpukXgd-WXgehU0Eq	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T15:38:05.083Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 17:38:19
Vt8PFOCAbxiHIOIirvbgglulSul9jQQZ	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T15:38:20.390Z","httpOnly":true,"path":"/"},"user_id":37}	2022-03-03 17:38:21
a8o-fc7biz-5phx4IZTyEfsV6vfhKXr2	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-06T16:50:57.267Z","httpOnly":true,"path":"/"},"user_id":6}	2022-03-06 18:51:38
aDfBBmleUVXAqByEDoobGQ2P2UxOt7ZW	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T16:45:56.670Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 18:46:00
beSBFvPXV56ePiR6Nq8648vbviU9-5r5	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T16:57:28.699Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 18:57:30
bkLwpar6CIndUJ-xBC6CfxvG22vL8lSU	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T16:46:00.593Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 18:46:02
Ewo2PT3UDXgKcpgSAeIZ1WKkbX51Qi5T	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T16:46:01.699Z","httpOnly":true,"path":"/"},"user_id":38}	2022-03-03 18:46:02
gYV5CceiHv4V4V_i6Ev4KR2a1c-DHKf0	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T16:54:37.321Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 18:54:39
04aA1zNdnDHvvQgC3U26CumzPu8vL_4Q	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T16:46:23.004Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 18:46:24
WNEAfoD2zAnlRRLAYWLQ98-C8ewxZqvl	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T16:55:15.647Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 18:55:17
U4MHQDaXdcmduD-5pbkc1zAVuQ07I0Ys	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T16:46:24.339Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 18:46:25
53Z1SKnuQN33K8PTurk5S0CM00RoROYy	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T16:46:25.000Z","httpOnly":true,"path":"/"},"user_id":39}	2022-03-03 18:46:26
fUjPyg88q221kBPNb557eWnRwpbFu8rM	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T16:58:50.167Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 18:59:09
t0ID7sWrMLlHxuCqes5vkg_l2NV1Wz98	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T16:50:01.699Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 18:50:03
zk9pt_tbB5eHJLRj7Rjysexht8QONUWU	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T16:55:44.171Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 18:55:45
D9iruhwihfMPLjOzeYcD8VFIaMzfCZkT	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T16:53:22.091Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 18:53:36
-Fa7DqluUvPpT5gU44fDWStJBM0wZCak	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T17:55:03.090Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 19:55:04
nGEfOt1DJD7ss-FAQ1_CXK7G-zIZx_6a	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T16:59:32.408Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 18:59:43
QdIOs0IPZJ0xOVqe3aLOTH87smEke8ie	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T16:56:47.681Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 18:56:49
pKpc7KcWfnXj8CIMRIrC_IvZfXKsMnPS	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T17:02:30.259Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 19:03:58
WT-dRfWE0GsmYbHIbnAxBMMNZcQXh53h	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T17:14:53.824Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 19:14:57
YZ3IJduH-tjZ17tfwIy7xi607742lePQ	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T17:18:51.336Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 19:18:52
DHjAHcQTHg9Wsoezaq_K4GBJtrrbTSbZ	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T17:01:03.501Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 19:01:11
4CMGXufWYpUbhblUZLzKK_0S8qFu2v1N	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T17:19:43.268Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 19:19:44
dVT7WRC-6Kmy3ZBikdeHtFoJb7MT1Lco	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T17:22:25.786Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 19:22:26
s_2bXI080_16qQSWu8WM8zHnSb4bhw4T	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T17:08:50.525Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 19:08:59
hOqJB9T0GUUQzV2ETHMTIGQ268e81sw2	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T17:23:17.820Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 19:23:18
_0_lvG_h7MKF5e2rCM-bu8HJOEuRd6L-	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T17:33:11.743Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 19:33:12
dVfjchT9VNGJtR0JsEFEXfGkvAwoJTa7	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T17:35:53.112Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 19:35:54
NJXsBH_56GBq9dtAtMCmNye6UJZ2k9Zy	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T17:54:33.221Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 19:54:34
eWYLEBKUNS_mp8GdElpLvhLwSocsxqhw	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-04T20:53:04.772Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-04 22:53:12
aq8BXXYB07I6F1ROKCOBsp1sH3Kz5IJo	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T18:06:03.882Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 20:06:05
QaSPejiVVzu_bxuj4dA7GIG_2HJ2-g9s	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T18:06:02.914Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 20:06:04
Ijok8USv27JiOYa0LzLBatQjynFuTo1U	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T17:57:36.268Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 19:57:38
1rhN9IXhIH-Y6Kf_gMfma6yLAXsLJsej	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T18:05:45.196Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-03 20:05:46
XrWRinSqjpHJkbgngR0LcPRAFyyiawiO	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-03T18:06:04.726Z","httpOnly":true,"path":"/"},"user_id":40}	2022-03-03 20:06:05
EbbyHhB50ghIT3WRYC4UwHs6JkNEAzW8	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-04T20:41:03.301Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-04 22:41:04
O-qNyZfcRQ6dX9H5dpY1ugQJORtRAlq_	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-04T20:38:52.124Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-04 22:38:53
_ivx_NRYw81jCaJMD9dJM17aV7SzEqW8	{"cookie":{"originalMaxAge":604800000,"expires":"2022-03-04T20:56:16.216Z","httpOnly":true,"path":"/"},"user_id":22}	2022-03-04 22:56:19
\.


--
-- TOC entry 3386 (class 0 OID 0)
-- Dependencies: 217
-- Name: carts_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_items_id_seq', 23, true);


--
-- TOC entry 3387 (class 0 OID 0)
-- Dependencies: 209
-- Name: inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventory_id_seq', 34, true);


--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 213
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 16, true);


--
-- TOC entry 3389 (class 0 OID 0)
-- Dependencies: 219
-- Name: orders_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_items_id_seq', 20, true);


--
-- TOC entry 3390 (class 0 OID 0)
-- Dependencies: 215
-- Name: products_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_images_id_seq', 27, true);


--
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 211
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 42, true);


-- Completed on 2022-02-28 03:41:18 EET

--
-- PostgreSQL database dump complete
--

