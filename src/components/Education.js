import React, { Component } from "react";
import { FaGraduationCap } from "react-icons/fa";

class Education extends Component {
  render() {
    if (this.props.resumeEducation && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.education;
      var education = this.props.resumeEducation.map(function (edu, i) {
        return (
          <div className="col-md-6 mb-4" key={i}>
            <div className="card shadow-sm p-4 h-100">
              <h4 className="mb-2"><FaGraduationCap className="me-2" />{edu.degree}</h4>
              <h5 className="text-muted">{edu.school}</h5>
              <p className="text-secondary mb-1"><strong>Years:</strong> {edu.years}</p>
              <ul className="mb-0">
                {edu.details.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      });
    }

    return (
      <section id="education">
        <div className="container py-5">
          <h1 className="section-title text-center mb-5" style={{ color: "black" }}>
            <span>{sectionName}</span>
          </h1>
          <div className="row justify-content-center">
            {education}
          </div>
        </div>
      </section>
    );
  }
}

export default Education;
