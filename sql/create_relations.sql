--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Ubuntu 14.2-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.2 (Ubuntu 14.2-1.pgdg20.04+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: carts_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts_items (
    id integer NOT NULL,
    product_id integer,
    user_id integer,
    quantity integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.carts_items OWNER TO postgres;

--
-- Name: carts_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carts_items_id_seq OWNER TO postgres;

--
-- Name: carts_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_items_id_seq OWNED BY public.carts_items.id;


--
-- Name: inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventory (
    id integer NOT NULL,
    product_name text,
    price numeric(10,2) NOT NULL,
    product_desc text,
    quantity integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.inventory OWNER TO postgres;

--
-- Name: inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventory_id_seq OWNER TO postgres;

--
-- Name: inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventory_id_seq OWNED BY public.inventory.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer,
    status text,
    total_price numeric(10,2) DEFAULT NULL::numeric
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: orders_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders_items (
    id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer
);


ALTER TABLE public.orders_items OWNER TO postgres;

--
-- Name: orders_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_items_id_seq OWNER TO postgres;

--
-- Name: orders_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_items_id_seq OWNED BY public.orders_items.id;


--
-- Name: products_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_images (
    id integer NOT NULL,
    url text,
    its_product_id integer,
    image_name text
);


ALTER TABLE public.products_images OWNER TO postgres;

--
-- Name: products_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_images_id_seq OWNER TO postgres;

--
-- Name: products_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_images_id_seq OWNED BY public.products_images.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    birthdate date NOT NULL,
    gender text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: carts_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts_items ALTER COLUMN id SET DEFAULT nextval('public.carts_items_id_seq'::regclass);


--
-- Name: inventory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory ALTER COLUMN id SET DEFAULT nextval('public.inventory_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: orders_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_items ALTER COLUMN id SET DEFAULT nextval('public.orders_items_id_seq'::regclass);


--
-- Name: products_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_images ALTER COLUMN id SET DEFAULT nextval('public.products_images_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: carts_items carts_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts_items
    ADD CONSTRAINT carts_items_pkey PRIMARY KEY (id);


--
-- Name: carts_items carts_items_product_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts_items
    ADD CONSTRAINT carts_items_product_id_user_id_key UNIQUE (product_id, user_id);


--
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (id);


--
-- Name: orders_items orders_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT orders_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products_images products_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_images
    ADD CONSTRAINT products_images_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- Name: its_product_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX its_product_id_index ON public.products_images USING btree (its_product_id);


--
-- Name: order_id_orders_items; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX order_id_orders_items ON public.orders_items USING btree (order_id);


--
-- Name: product_id_orders_items; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX product_id_orders_items ON public.orders_items USING btree (product_id);


--
-- Name: user_id_carts_items; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_id_carts_items ON public.carts_items USING btree (user_id);


--
-- Name: user_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_id_index ON public.orders USING btree (user_id);


--
-- Name: carts_items carts_items_ibfk_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts_items
    ADD CONSTRAINT carts_items_ibfk_2 FOREIGN KEY (product_id) REFERENCES public.inventory(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: carts_items carts_items_ibfk_3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts_items
    ADD CONSTRAINT carts_items_ibfk_3 FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders orders_ibfk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_ibfk_1 FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders_items orders_items_ibfk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT orders_items_ibfk_1 FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders_items orders_items_ibfk_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT orders_items_ibfk_2 FOREIGN KEY (product_id) REFERENCES public.inventory(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: products_images products_images_ibfk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_images
    ADD CONSTRAINT products_images_ibfk_1 FOREIGN KEY (its_product_id) REFERENCES public.inventory(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

