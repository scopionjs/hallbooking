import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import React from "react";
import Nav from '../components/nav';
import Intro from "../components/intro";
import Why_us from "../components/why_us";
import About_us from "../components/about";
import Footer from "../components/footer";

const Home = () => (
  <div >
    <Head>
      <title>CompanyX - Home</title>
    </Head>
    <Nav />
   < hr />
    <Intro />
    <Why_us />
    <About_us />
    <Footer />
  </div>
);

export default Home;
