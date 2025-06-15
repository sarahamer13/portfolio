import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import $ from "jquery";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Home from "./components/Home";
import Experience from "./components/Experience";
import Education from "./components/Education"; // ✅ Added Education import

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      foo: "bar",
      resumeData: {},
      sharedData: {},
    };
  }

  applyPickedLanguage = (pickedLanguage, oppositeLangIconId) => {
    this.swapCurrentlyActiveLanguage(oppositeLangIconId);
    document.documentElement.lang = pickedLanguage;
    var resumePath =
      document.documentElement.lang === window.$primaryLanguage
        ? `res_primaryLanguage.json`
        : `res_secondaryLanguage.json`;
    this.loadResumeFromPath(resumePath);
  };

  swapCurrentlyActiveLanguage = (oppositeLangIconId) => {
    var pickedLangIconId =
      oppositeLangIconId === window.$primaryLanguageIconId
        ? window.$secondaryLanguageIconId
        : window.$primaryLanguageIconId;
    document
      .getElementById(oppositeLangIconId)
      .removeAttribute("filter", "brightness(40%)");
    document
      .getElementById(pickedLangIconId)
      .setAttribute("filter", "brightness(40%)");
  };

  componentDidMount = () => {
    this.loadSharedData();
    this.applyPickedLanguage(
      window.$primaryLanguage,
      window.$secondaryLanguageIconId
    );
  };

  loadResumeFromPath = (path) => {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
        console.log("✅ resumeData loaded:", data); // Log resume data
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  };

  loadSharedData = () => {
    $.ajax({
      url: `portfolio_shared_data.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState(
          { sharedData: data },
          () => (document.title = `${this.state.sharedData.basic_info.name}`)
        );
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  };

  render() {
    return (
      <Router>
        <Header sharedData={this.state.sharedData} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                resumeData={this.state.resumeData}
                sharedData={this.state.sharedData}
              />
            }
          />
          <Route
            path="/about"
            element={
              <About
                resumeBasicInfo={this.state.resumeData.basic_info}
                sharedBasicInfo={this.state.sharedData.basic_info}
              />
            }
          />
          <Route
            path="/experience"
            element={
              <Experience
                resumeExperience={this.state.resumeData.experience}
                resumeBasicInfo={this.state.resumeData.basic_info}
              />
            }
          />
          <Route
            path="/education"
            element={
              this.state.resumeData.education &&
              this.state.resumeData.basic_info ? (
                <Education
                  resumeEducation={this.state.resumeData.education}
                  resumeBasicInfo={this.state.resumeData.basic_info}
                />
              ) : (
                <div className="text-center py-5">Loading education...</div>
              )
            }
          />
        </Routes>
        <Footer
          sharedBasicInfo={this.state.sharedData.basic_info}
          applyPickedLanguage={this.applyPickedLanguage}
        />
      </Router>
    );
  }
}

export default App;
