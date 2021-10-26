import React, { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Grid } from "@material-ui/core";

import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from "../../../static/Styling/featureButton.css";
import { COLORS } from "../../themeColors";
import mensCalendar from "../../../static/images/vv.jpg";
import myth from "../../../static/images/myth.jpg";
import cm from "../../../static/images/hh.jpg";

const MenstrualTips = () => {
  return (
    <div
      class="bg_image"
      style={{
        backgroundImage: "url(/img/mens_pink.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100%",
        opacity: " 0.9",
        backgroundPosition: "center",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 0,
          maxWidth: 1900,
          padding: 0,
          marginRight: 0,
        }}
      >
        <div style={{ backgroundColor: "black", color: "black" }}>
          {ShowHeader(COLORS.menstrualBackground)}
        </div>

        <Row className="body_feature_row">
          {/* <img
                src={tipsImg}
                
              ></img>{" "} */}

          <Col
            className="body_feature_column"
            style={{ position: "fixed" }}
            sm={2}
          >
            <pre></pre>
            <pre></pre>
            <pre></pre> <pre></pre> <pre></pre>
            <pre></pre>
            {ShowFeatureButtons()}
          </Col>
          <Col
            style={{
              marginLeft: 120,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Row>
              <Col
                item
                xs={5.3}
                style={{
                  marginTop: 70,
                  height: 400,
                  marginInlineEnd: 0,
                  gridColumn: 2,
                }}
              >
                <img src={mensCalendar}></img>
              </Col>
              <Col item xs={6.5} style={{ marginTop: 80, height: 400 }}>
                <h3>
                  <i>Menstruation TIPS</i> 💡<pre></pre>
                </h3>
                <div style={{ fontSize: 22 }}>
                  🎀 Be your own{" "}
                  <span
                    style={{ color: "#b2066b", fontWeight: 600, fontSize: 26 }}
                  >
                    <i>Period Expert</i>
                  </span>{" "}
                  by tracking your menstrual cycle <br></br>
                  <pre></pre>
                  🎀 Eat{" "}
                  <span style={{ color: "#6aa84f", fontWeight: 600 }}>
                    leafy green vegetables
                  </span>{" "}
                  🥒🥦🥗 riches in MAGNESIUM to manage PMS <br></br>
                  <pre></pre>
                  🎀 Get enough<b> sleep </b>💤 <br></br>
                  <pre></pre>
                  🎀{" "}
                  <span
                    style={{ color: "#b2066b", fontWeight: 600, fontSize: 26 }}
                  >
                    Exercise
                  </span>{" "}
                  to get a healthy menstrual cycle <br></br>
                  <pre></pre>
                  🎀 <b>Change</b> your pads/tampons within<b> 5-6hrs</b>{" "}
                  <br></br>
                  <pre></pre>
                  🎀 <b>Discard </b>your used sanitary product properly{" "}
                  <br></br>
                  <pre></pre>
                  🎀 Be ready with{" "}
                  <span
                    style={{ color: "#b2066b", fontWeight: 600, fontSize: 26 }}
                  >
                    <i>on-the-go stuff</i>
                  </span>{" "}
                  during your periods <br></br>
                </div>
              </Col>
              {/* <Grid item xs={6} style={{height:400}}></Grid>
              <Grid item xs={6} style={{backgroundColor:'black'}}></Grid>
              <Grid item xs={6} style={{height:400}}></Grid>
              <Grid item xs={6} style={{backgroundColor:'blue'}}></Grid> */}
            </Row>

            <Row>
              <Col item xs={6.5} style={{ marginTop: 80, height: 400 }}>
                <h3>
                  <pre></pre>
                  <pre></pre>
                  <i> Menstruation Myths</i> <pre></pre>
                  <pre></pre>
                </h3>
                <div style={{ fontSize: 22 }}>
                  📍 Your period 🩸 should last exactly one week each month.{" "}
                  <br></br>
                  <pre></pre>
                  📍 Premenstrual Syndrome (PMS) is all in your head<br></br>
                  <pre></pre>
                  📍 You should avoid{" "}
                  <span style={{ color: "#b2066b", fontWeight: 600 }}>
                    {" "}
                    activities{" "}
                  </span>
                  like exercise 🏋🏼‍♀️ when you're on your period <br></br>
                  <pre></pre>
                  📍 Woman should not visit a place of worship during her period
                </div>
              </Col>
              <Col
                item
                xs={5.3}
                style={{
                  marginTop: 70,
                  height: 400,
                  marginInlineEnd: 0,
                  gridColumn: 2,
                }}
              >
                <img src={myth}></img>
              </Col>
            </Row>
            <Row>
              <Col
                item
                xs={5.3}
                style={{
                  marginTop: 40,
                  height: 400,
                  marginInlineEnd: 0,
                  gridColumn: 2,
                }}
              >
                <img src={cm}></img>
              </Col>
              <Col
                item
                xs={6.5}
                style={{ marginTop: 80, height: 400, marginLeft: 15 }}
              >
                <h3>
                  <i>COMMON MISTAKES</i> 🚫<pre></pre>
                </h3>
                <div style={{ fontSize: 22 }}>
                  ❌ Forget to{" "}
                  <span
                    style={{ color: "#b2066b", fontWeight: 600, fontSize: 26 }}
                  >
                    <i>Change</i>
                  </span>{" "}
                  sanitary napkins and tampons regularly. <br></br>
                  <pre></pre>❌ Not{" "}
                  <span
                    style={{ color: "#0b5394", fontWeight: 600, fontSize: 25 }}
                  >
                    drinking
                  </span>{" "}
                  🥤 enough water <br></br>
                  <pre></pre>❌ Skipping meals 🥗<br></br>
                  <pre></pre>❌ Not{" "}
                  <span
                    style={{ color: "#b2066b", fontWeight: 600, fontSize: 26 }}
                  >
                    resting
                  </span>{" "}
                  enough 💤 <br></br>
                  <pre></pre>❌ Use of{" "}
                  <span
                    style={{ color: "#660000", fontWeight: 600, fontSize: 26 }}
                  >
                    scented products.
                  </span>{" "}
                  This can conflict with your pH levels.
                  <br></br>
                  <pre></pre>❌ Use{" "}
                  <span
                    style={{ color: "#0b5394", fontWeight: 600, fontSize: 25 }}
                  >
                    soaps
                  </span>{" "}
                  🧼 or{" "}
                  <span
                    style={{ color: "#b2066b", fontWeight: 600, fontSize: 26 }}
                  >
                    {" "}
                    vaginal hygiene{" "}
                  </span>
                  🧴 products
                </div>
              </Col>
            </Row>
            <Row>
              <Col
                item
                xs={8}
                style={{
                  marginTop: 70,
                  height: "90%",
                  marginInlineEnd: 0,
                  gridColumn: 2,
                }}
              >
                <h2>
                  <i>FAQs</i> ⁉<pre></pre>
                </h2>
                <div style={{ fontSize: 22 }}>
                  <span
                    style={{
                      fontSize: 26,
                      color: "#b2066b",
                      fontStyle: "italic",
                    }}
                  >
                    {" "}
                    <b> When Do Most Girls Get Their Period?</b>
                  </span>
                  <br></br>
                  Most girls get their first period when they're around 12. But
                  getting it any time between age 10 and 15 is OK. Every girl's
                  body has its own schedule. It happens because of changes in
                  hormones in the body
                  <br></br>
                  <span
                    style={{
                      fontSize: 26,
                      color: "#b2066b",
                      fontStyle: "italic",
                    }}
                  >
                    {" "}
                    <b> How Long Do Periods Last?</b>
                  </span>
                  <br></br>
                  Periods usually happen about once every 4–5 weeks and usually
                  last about 5 days. But a period can be shorter or last longer.
                  <br></br>
                  <span
                    style={{
                      fontSize: 26,
                      color: "#b2066b",
                      fontStyle: "italic",
                    }}
                  >
                    {" "}
                    <b> Should I Use a Pad, Tampon, or Menstrual Cup?</b>
                  </span>
                  <br></br>
                  Most girls use pads when they first get their period. They
                  have sticky strips that attach to the underwear. Many girls
                  find tampons more convenient than pads, especially when
                  playing sports or swimming. Don't leave a tampon in for more
                  than 8 hours because this can increase your risk of a serious
                  infection called toxic shock syndrome. Some prefer silicone
                  menstrual cups.
                  <br></br>
                  <span
                    style={{
                      fontSize: 26,
                      color: "#b2066b",
                      fontStyle: "italic",
                    }}
                  >
                    {" "}
                    <b> How Much Blood Comes Out?</b>
                  </span>
                  <br></br>
                  It may look like a lot of blood, but a girl usually only loses
                  a few tablespoons of blood during the whole period. Most girls
                  need to change their pad, tampon, or menstrual cup about 3‒6
                  times a day.
                  <br></br>
                  <span
                    style={{
                      fontSize: 26,
                      color: "#b2066b",
                      fontStyle: "italic",
                    }}
                  >
                    {" "}
                    <b> What Is PMS?</b>
                  </span>
                  <br></br>
                  PMS (premenstrual syndrome) is when a girl has emotional and
                  physical symptoms that happen before or during her period.
                  These symptoms can include moodiness, sadness, anxiety,
                  bloating, and acne. The symptoms go away after the first few
                  days of a period.
                  <br></br>
                  <span
                    style={{
                      fontSize: 26,
                      color: "#b2066b",
                      fontStyle: "italic",
                    }}
                  >
                    {" "}
                    <b> What Can I Do About Cramps?</b>
                  </span>
                  <br></br>
                  Many girls have cramps with their period, especially in the
                  first few days. If cramps bother you, you can try a warm
                  heating pad on your belly or taking ibuprofen or naproxen.
                  <br></br>
                  <span
                    style={{
                      fontSize: 26,
                      color: "#b2066b",
                      fontStyle: "italic",
                    }}
                  >
                    {" "}
                    <b>Should I Watch for Any Problems?</b>
                  </span>
                  <br></br>
                  Consult with your doctor if you:<br></br>
                  🎗 are 15 and haven't started your period<br></br>
                  🎗 have had your period for more than 2 years and it still
                  doesn't come regularly (about every 4–5 weeks)<br></br>
                  🎗 have bleeding between periods<br></br>
                  🎗 have severe cramps that don't get better with ibuprofen or
                  naproxen <br></br>
                  🎗 have very heavy bleeding (bleeding that goes through a pad
                  or tampon faster than every 1 hour)<br></br>
                  🎗 have periods that last more than about a week<br></br>
                  🎗 have severe PMS that gets in the way of your everyday
                  activities<br></br>
                </div>
              </Col>
              
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MenstrualTips;
