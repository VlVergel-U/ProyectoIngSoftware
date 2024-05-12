toc.dat                                                                                             0000600 0004000 0002000 00000030074 14620213751 0014444 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP   !                    |            solocauchos    16.2    16.2 %    #           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         $           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         %           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         &           1262    16604    solocauchos    DATABASE     �   CREATE DATABASE solocauchos WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE solocauchos;
                postgres    false                     2615    16605 
   inventario    SCHEMA        CREATE SCHEMA inventario;
    DROP SCHEMA inventario;
                postgres    false         �            1259    16606    category    TABLE     u   CREATE TABLE inventario.category (
    id_category integer NOT NULL,
    trademark character varying(20) NOT NULL
);
     DROP TABLE inventario.category;
    
   inventario         heap    postgres    false    6         �            1259    16633    customer    TABLE     �  CREATE TABLE inventario.customer (
    customer_id integer NOT NULL,
    document_customer character varying(10) NOT NULL,
    first_name character varying(20) NOT NULL,
    second_name character varying(20),
    first_last_name character varying(20) NOT NULL,
    second_last_name character varying(20),
    address character varying(50) NOT NULL,
    phone character varying(10),
    email character varying(50)
);
     DROP TABLE inventario.customer;
    
   inventario         heap    postgres    false    6         �            1259    16693    detail    TABLE     �   CREATE TABLE inventario.detail (
    amount integer,
    price integer,
    shopping_id integer NOT NULL,
    product_id integer NOT NULL,
    CONSTRAINT detail_amount_check CHECK ((amount >= 0)),
    CONSTRAINT detail_price_check CHECK ((price >= 0))
);
    DROP TABLE inventario.detail;
    
   inventario         heap    postgres    false    6         �            1259    16613    product    TABLE     �  CREATE TABLE inventario.product (
    id_product integer NOT NULL,
    name_product character varying(40) NOT NULL,
    shopping_price numeric(10,2),
    sale_price numeric(10,2),
    stock numeric(10,0),
    trademark character varying(20),
    category_type integer,
    CONSTRAINT product_sale_price_check CHECK ((sale_price >= (0)::numeric)),
    CONSTRAINT product_shopping_price_check CHECK ((shopping_price >= (0)::numeric)),
    CONSTRAINT product_stock_check CHECK ((stock >= (0)::numeric))
);
    DROP TABLE inventario.product;
    
   inventario         heap    postgres    false    6         �            1259    16681    shopping    TABLE     �   CREATE TABLE inventario.shopping (
    id integer NOT NULL,
    final_price integer NOT NULL,
    unit_price integer NOT NULL,
    date_shopping date NOT NULL,
    payment_method text NOT NULL,
    customer_id integer
);
     DROP TABLE inventario.shopping;
    
   inventario         heap    postgres    false    6         �            1259    16652    supplier    TABLE     �   CREATE TABLE inventario.supplier (
    nit integer NOT NULL,
    name_supplier character varying(50) NOT NULL,
    address character varying(50) NOT NULL,
    phone character varying(10),
    email character varying(50)
);
     DROP TABLE inventario.supplier;
    
   inventario         heap    postgres    false    6         �            1259    16661    supplier_product    TABLE     ~   CREATE TABLE inventario.supplier_product (
    date_supplier_product date,
    id_product integer,
    id_supplier integer
);
 (   DROP TABLE inventario.supplier_product;
    
   inventario         heap    postgres    false    6                   0    16606    category 
   TABLE DATA           >   COPY inventario.category (id_category, trademark) FROM stdin;
 
   inventario          postgres    false    216       4890.dat           0    16633    customer 
   TABLE DATA           �   COPY inventario.customer (customer_id, document_customer, first_name, second_name, first_last_name, second_last_name, address, phone, email) FROM stdin;
 
   inventario          postgres    false    218       4892.dat            0    16693    detail 
   TABLE DATA           L   COPY inventario.detail (amount, price, shopping_id, product_id) FROM stdin;
 
   inventario          postgres    false    222       4896.dat           0    16613    product 
   TABLE DATA           |   COPY inventario.product (id_product, name_product, shopping_price, sale_price, stock, trademark, category_type) FROM stdin;
 
   inventario          postgres    false    217       4891.dat           0    16681    shopping 
   TABLE DATA           o   COPY inventario.shopping (id, final_price, unit_price, date_shopping, payment_method, customer_id) FROM stdin;
 
   inventario          postgres    false    221       4895.dat           0    16652    supplier 
   TABLE DATA           Q   COPY inventario.supplier (nit, name_supplier, address, phone, email) FROM stdin;
 
   inventario          postgres    false    219       4893.dat           0    16661    supplier_product 
   TABLE DATA           ^   COPY inventario.supplier_product (date_supplier_product, id_product, id_supplier) FROM stdin;
 
   inventario          postgres    false    220       4894.dat n           2606    16610    category category_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY inventario.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id_category);
 D   ALTER TABLE ONLY inventario.category DROP CONSTRAINT category_pkey;
    
   inventario            postgres    false    216         t           2606    16639 '   customer customer_document_customer_key 
   CONSTRAINT     s   ALTER TABLE ONLY inventario.customer
    ADD CONSTRAINT customer_document_customer_key UNIQUE (document_customer);
 U   ALTER TABLE ONLY inventario.customer DROP CONSTRAINT customer_document_customer_key;
    
   inventario            postgres    false    218         v           2606    16643    customer customer_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY inventario.customer
    ADD CONSTRAINT customer_email_key UNIQUE (email);
 I   ALTER TABLE ONLY inventario.customer DROP CONSTRAINT customer_email_key;
    
   inventario            postgres    false    218         x           2606    16641    customer customer_phone_key 
   CONSTRAINT     [   ALTER TABLE ONLY inventario.customer
    ADD CONSTRAINT customer_phone_key UNIQUE (phone);
 I   ALTER TABLE ONLY inventario.customer DROP CONSTRAINT customer_phone_key;
    
   inventario            postgres    false    218         z           2606    16637    customer customer_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY inventario.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customer_id);
 D   ALTER TABLE ONLY inventario.customer DROP CONSTRAINT customer_pkey;
    
   inventario            postgres    false    218         �           2606    16699    detail detail_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY inventario.detail
    ADD CONSTRAINT detail_pkey PRIMARY KEY (shopping_id, product_id);
 @   ALTER TABLE ONLY inventario.detail DROP CONSTRAINT detail_pkey;
    
   inventario            postgres    false    222    222         r           2606    16620    product product_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY inventario.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id_product);
 B   ALTER TABLE ONLY inventario.product DROP CONSTRAINT product_pkey;
    
   inventario            postgres    false    217         �           2606    16687    shopping shopping_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY inventario.shopping
    ADD CONSTRAINT shopping_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY inventario.shopping DROP CONSTRAINT shopping_pkey;
    
   inventario            postgres    false    221         |           2606    16660    supplier supplier_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY inventario.supplier
    ADD CONSTRAINT supplier_email_key UNIQUE (email);
 I   ALTER TABLE ONLY inventario.supplier DROP CONSTRAINT supplier_email_key;
    
   inventario            postgres    false    219         ~           2606    16658    supplier supplier_phone_key 
   CONSTRAINT     [   ALTER TABLE ONLY inventario.supplier
    ADD CONSTRAINT supplier_phone_key UNIQUE (phone);
 I   ALTER TABLE ONLY inventario.supplier DROP CONSTRAINT supplier_phone_key;
    
   inventario            postgres    false    219         �           2606    16656    supplier supplier_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY inventario.supplier
    ADD CONSTRAINT supplier_pkey PRIMARY KEY (nit);
 D   ALTER TABLE ONLY inventario.supplier DROP CONSTRAINT supplier_pkey;
    
   inventario            postgres    false    219         p           2606    16612    category type_trademark_unique 
   CONSTRAINT     o   ALTER TABLE ONLY inventario.category
    ADD CONSTRAINT type_trademark_unique UNIQUE (id_category, trademark);
 L   ALTER TABLE ONLY inventario.category DROP CONSTRAINT type_trademark_unique;
    
   inventario            postgres    false    216    216         �           2606    16705    detail detail_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY inventario.detail
    ADD CONSTRAINT detail_product_id_fkey FOREIGN KEY (product_id) REFERENCES inventario.product(id_product);
 K   ALTER TABLE ONLY inventario.detail DROP CONSTRAINT detail_product_id_fkey;
    
   inventario          postgres    false    222    4722    217         �           2606    16700    detail detail_shopping_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY inventario.detail
    ADD CONSTRAINT detail_shopping_id_fkey FOREIGN KEY (shopping_id) REFERENCES inventario.shopping(id);
 L   ALTER TABLE ONLY inventario.detail DROP CONSTRAINT detail_shopping_id_fkey;
    
   inventario          postgres    false    221    222    4738         �           2606    16621 "   product product_category_type_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY inventario.product
    ADD CONSTRAINT product_category_type_fkey FOREIGN KEY (category_type) REFERENCES inventario.category(id_category);
 P   ALTER TABLE ONLY inventario.product DROP CONSTRAINT product_category_type_fkey;
    
   inventario          postgres    false    4718    217    216         �           2606    16688 "   shopping shopping_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY inventario.shopping
    ADD CONSTRAINT shopping_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES inventario.customer(customer_id);
 P   ALTER TABLE ONLY inventario.shopping DROP CONSTRAINT shopping_customer_id_fkey;
    
   inventario          postgres    false    4730    218    221         �           2606    16664 1   supplier_product supplier_product_id_product_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY inventario.supplier_product
    ADD CONSTRAINT supplier_product_id_product_fkey FOREIGN KEY (id_product) REFERENCES inventario.product(id_product);
 _   ALTER TABLE ONLY inventario.supplier_product DROP CONSTRAINT supplier_product_id_product_fkey;
    
   inventario          postgres    false    217    4722    220         �           2606    16669 2   supplier_product supplier_product_id_supplier_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY inventario.supplier_product
    ADD CONSTRAINT supplier_product_id_supplier_fkey FOREIGN KEY (id_supplier) REFERENCES inventario.supplier(nit);
 `   ALTER TABLE ONLY inventario.supplier_product DROP CONSTRAINT supplier_product_id_supplier_fkey;
    
   inventario          postgres    false    4736    219    220                                                                                                                                                                                                                                                                                                                                                                                                                                                                            4890.dat                                                                                            0000600 0004000 0002000 00000000005 14620213751 0014252 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4892.dat                                                                                            0000600 0004000 0002000 00000000005 14620213751 0014254 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4896.dat                                                                                            0000600 0004000 0002000 00000000005 14620213751 0014260 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4891.dat                                                                                            0000600 0004000 0002000 00000000005 14620213751 0014253 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4895.dat                                                                                            0000600 0004000 0002000 00000000005 14620213751 0014257 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4893.dat                                                                                            0000600 0004000 0002000 00000000005 14620213751 0014255 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4894.dat                                                                                            0000600 0004000 0002000 00000000005 14620213751 0014256 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           restore.sql                                                                                         0000600 0004000 0002000 00000024223 14620213751 0015370 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

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

DROP DATABASE solocauchos;
--
-- Name: solocauchos; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE solocauchos WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';


ALTER DATABASE solocauchos OWNER TO postgres;

\connect solocauchos

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
-- Name: inventario; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA inventario;


ALTER SCHEMA inventario OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: inventario; Owner: postgres
--

CREATE TABLE inventario.category (
    id_category integer NOT NULL,
    trademark character varying(20) NOT NULL
);


ALTER TABLE inventario.category OWNER TO postgres;

--
-- Name: customer; Type: TABLE; Schema: inventario; Owner: postgres
--

CREATE TABLE inventario.customer (
    customer_id integer NOT NULL,
    document_customer character varying(10) NOT NULL,
    first_name character varying(20) NOT NULL,
    second_name character varying(20),
    first_last_name character varying(20) NOT NULL,
    second_last_name character varying(20),
    address character varying(50) NOT NULL,
    phone character varying(10),
    email character varying(50)
);


ALTER TABLE inventario.customer OWNER TO postgres;

--
-- Name: detail; Type: TABLE; Schema: inventario; Owner: postgres
--

CREATE TABLE inventario.detail (
    amount integer,
    price integer,
    shopping_id integer NOT NULL,
    product_id integer NOT NULL,
    CONSTRAINT detail_amount_check CHECK ((amount >= 0)),
    CONSTRAINT detail_price_check CHECK ((price >= 0))
);


ALTER TABLE inventario.detail OWNER TO postgres;

--
-- Name: product; Type: TABLE; Schema: inventario; Owner: postgres
--

CREATE TABLE inventario.product (
    id_product integer NOT NULL,
    name_product character varying(40) NOT NULL,
    shopping_price numeric(10,2),
    sale_price numeric(10,2),
    stock numeric(10,0),
    trademark character varying(20),
    category_type integer,
    CONSTRAINT product_sale_price_check CHECK ((sale_price >= (0)::numeric)),
    CONSTRAINT product_shopping_price_check CHECK ((shopping_price >= (0)::numeric)),
    CONSTRAINT product_stock_check CHECK ((stock >= (0)::numeric))
);


ALTER TABLE inventario.product OWNER TO postgres;

--
-- Name: shopping; Type: TABLE; Schema: inventario; Owner: postgres
--

CREATE TABLE inventario.shopping (
    id integer NOT NULL,
    final_price integer NOT NULL,
    unit_price integer NOT NULL,
    date_shopping date NOT NULL,
    payment_method text NOT NULL,
    customer_id integer
);


ALTER TABLE inventario.shopping OWNER TO postgres;

--
-- Name: supplier; Type: TABLE; Schema: inventario; Owner: postgres
--

CREATE TABLE inventario.supplier (
    nit integer NOT NULL,
    name_supplier character varying(50) NOT NULL,
    address character varying(50) NOT NULL,
    phone character varying(10),
    email character varying(50)
);


ALTER TABLE inventario.supplier OWNER TO postgres;

--
-- Name: supplier_product; Type: TABLE; Schema: inventario; Owner: postgres
--

CREATE TABLE inventario.supplier_product (
    date_supplier_product date,
    id_product integer,
    id_supplier integer
);


ALTER TABLE inventario.supplier_product OWNER TO postgres;

--
-- Data for Name: category; Type: TABLE DATA; Schema: inventario; Owner: postgres
--

COPY inventario.category (id_category, trademark) FROM stdin;
\.
COPY inventario.category (id_category, trademark) FROM '$$PATH$$/4890.dat';

--
-- Data for Name: customer; Type: TABLE DATA; Schema: inventario; Owner: postgres
--

COPY inventario.customer (customer_id, document_customer, first_name, second_name, first_last_name, second_last_name, address, phone, email) FROM stdin;
\.
COPY inventario.customer (customer_id, document_customer, first_name, second_name, first_last_name, second_last_name, address, phone, email) FROM '$$PATH$$/4892.dat';

--
-- Data for Name: detail; Type: TABLE DATA; Schema: inventario; Owner: postgres
--

COPY inventario.detail (amount, price, shopping_id, product_id) FROM stdin;
\.
COPY inventario.detail (amount, price, shopping_id, product_id) FROM '$$PATH$$/4896.dat';

--
-- Data for Name: product; Type: TABLE DATA; Schema: inventario; Owner: postgres
--

COPY inventario.product (id_product, name_product, shopping_price, sale_price, stock, trademark, category_type) FROM stdin;
\.
COPY inventario.product (id_product, name_product, shopping_price, sale_price, stock, trademark, category_type) FROM '$$PATH$$/4891.dat';

--
-- Data for Name: shopping; Type: TABLE DATA; Schema: inventario; Owner: postgres
--

COPY inventario.shopping (id, final_price, unit_price, date_shopping, payment_method, customer_id) FROM stdin;
\.
COPY inventario.shopping (id, final_price, unit_price, date_shopping, payment_method, customer_id) FROM '$$PATH$$/4895.dat';

--
-- Data for Name: supplier; Type: TABLE DATA; Schema: inventario; Owner: postgres
--

COPY inventario.supplier (nit, name_supplier, address, phone, email) FROM stdin;
\.
COPY inventario.supplier (nit, name_supplier, address, phone, email) FROM '$$PATH$$/4893.dat';

--
-- Data for Name: supplier_product; Type: TABLE DATA; Schema: inventario; Owner: postgres
--

COPY inventario.supplier_product (date_supplier_product, id_product, id_supplier) FROM stdin;
\.
COPY inventario.supplier_product (date_supplier_product, id_product, id_supplier) FROM '$$PATH$$/4894.dat';

--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id_category);


--
-- Name: customer customer_document_customer_key; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.customer
    ADD CONSTRAINT customer_document_customer_key UNIQUE (document_customer);


--
-- Name: customer customer_email_key; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.customer
    ADD CONSTRAINT customer_email_key UNIQUE (email);


--
-- Name: customer customer_phone_key; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.customer
    ADD CONSTRAINT customer_phone_key UNIQUE (phone);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customer_id);


--
-- Name: detail detail_pkey; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.detail
    ADD CONSTRAINT detail_pkey PRIMARY KEY (shopping_id, product_id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id_product);


--
-- Name: shopping shopping_pkey; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.shopping
    ADD CONSTRAINT shopping_pkey PRIMARY KEY (id);


--
-- Name: supplier supplier_email_key; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.supplier
    ADD CONSTRAINT supplier_email_key UNIQUE (email);


--
-- Name: supplier supplier_phone_key; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.supplier
    ADD CONSTRAINT supplier_phone_key UNIQUE (phone);


--
-- Name: supplier supplier_pkey; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.supplier
    ADD CONSTRAINT supplier_pkey PRIMARY KEY (nit);


--
-- Name: category type_trademark_unique; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.category
    ADD CONSTRAINT type_trademark_unique UNIQUE (id_category, trademark);


--
-- Name: detail detail_product_id_fkey; Type: FK CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.detail
    ADD CONSTRAINT detail_product_id_fkey FOREIGN KEY (product_id) REFERENCES inventario.product(id_product);


--
-- Name: detail detail_shopping_id_fkey; Type: FK CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.detail
    ADD CONSTRAINT detail_shopping_id_fkey FOREIGN KEY (shopping_id) REFERENCES inventario.shopping(id);


--
-- Name: product product_category_type_fkey; Type: FK CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.product
    ADD CONSTRAINT product_category_type_fkey FOREIGN KEY (category_type) REFERENCES inventario.category(id_category);


--
-- Name: shopping shopping_customer_id_fkey; Type: FK CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.shopping
    ADD CONSTRAINT shopping_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES inventario.customer(customer_id);


--
-- Name: supplier_product supplier_product_id_product_fkey; Type: FK CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.supplier_product
    ADD CONSTRAINT supplier_product_id_product_fkey FOREIGN KEY (id_product) REFERENCES inventario.product(id_product);


--
-- Name: supplier_product supplier_product_id_supplier_fkey; Type: FK CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.supplier_product
    ADD CONSTRAINT supplier_product_id_supplier_fkey FOREIGN KEY (id_supplier) REFERENCES inventario.supplier(nit);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             