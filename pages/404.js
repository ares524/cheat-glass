import React from "react";
import Link from 'next/link';
import { Container, Row, Col, Button } from "reactstrap";
import img from "public/images/e-commerce/404/404.png";
import s from "pages/error/Error.module.scss";
import Head from "next/head";

const Index = () => {
    return (
        <>
            <Head>
                <title>404</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container>
                <Row className={"mb-5"} style={{ marginTop: 32 }}>
                    <section className={s.error}>
                        <Container className={"h-100"}>
                            <Row className={"h-100"}>
                                <Col sm={6}></Col>
                                <Col
                                    sm={6}
                                    className={
                                        "d-flex flex-column justify-content-center align-items-start"
                                    }
                                >
                                    <h3 className={"fw-bold text-primary mb-3"}>OOPS!</h3>
                                    <h2 className={"fw-bold mb-4"}>Something’s Missing</h2>
                                    <p style={{ width: 300 }} className={"mb-5"}>
                                    Unfortunately, we cannot find the page you are looking for. Thought, we tried...
                                    </p>
                                    <Link href="/">
                                        <Button outline color={"primary"} className={"fw-bold"}>
                                            TAKE ME AWAY
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </Row>
            </Container>
        </>
    );
};

export const getStaticProps = () => {
    return {
        props: {}
    };
}

export default Index;
