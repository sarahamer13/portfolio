import React, { Component } from "react";
import Projects from "./Projects";
import Skills from "./Skills";
import Experience from "./Experience";
import Education from "./Education";

class Home extends Component {
  render() {
    const { resumeData, sharedData } = this.props;

    return (
      <div>
        <Projects
          resumeProjects={resumeData.projects}
          resumeBasicInfo={resumeData.basic_info}
        />
        <Skills
          sharedSkills={sharedData.skills}
          resumeBasicInfo={resumeData.basic_info}
        />
        <Experience
          resumeExperience={resumeData.experience}
          resumeBasicInfo={resumeData.basic_info}
        />
        {resumeData.education && resumeData.basic_info && (
          <Education
            resumeEducation={resumeData.education}
            resumeBasicInfo={resumeData.basic_info}
          />
        )}
      </div>
    );
  }
}

export default Home;
