import React, { Component } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

class Experience extends Component {
  render() {
    let sectionName, work;

    if (this.props.resumeExperience && this.props.resumeBasicInfo) {
      sectionName = this.props.resumeBasicInfo.section_name.experience;
      work = this.props.resumeExperience.map((role, i) => {
        return (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date={role.years}
            iconStyle={{
              background: "#AE944F",
              color: "#fff",
              textAlign: "center",
            }}
            icon={
              <i className="fas fa-briefcase experience-icon"></i>
            }
            key={i}
          >
            <h3 className="vertical-timeline-element-title">{role.title}</h3>
            <h4 className="vertical-timeline-element-subtitle">{role.company}</h4>
            <ul className="mt-3">
              {role.description.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </VerticalTimelineElement>
        );
      });
    }

    return (
      <section id="resume" className="pb-5">
        <div className="col-md-12 mx-auto">
          <div className="col-md-12">
            <h1 className="section-title" style={{ color: "black" }}>
              <span className="text-black" style={{ textAlign: "center" }}>
                {sectionName}
              </span>
            </h1>
          </div>
        </div>
        <div className="col-md-8 mx-auto">
          <VerticalTimeline>
            {work}
            <VerticalTimelineElement
              iconStyle={{
                background: "#AE944F",
                color: "#fff",
                textAlign: "center",
              }}
              icon={
                <i className="fas fa-hourglass-start mx-auto experience-icon"></i>
              }
            />
          </VerticalTimeline>
        </div>
      </section>
    );
  }
}

export default Experience;
