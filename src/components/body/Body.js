import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { ArrowDown, ArrowLeft } from "react-feather";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import html2pdf from 'html2pdf.js'
import { useUser } from '../../userContext';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import Editor from "../editor/Editor";
import Resume from "../resume/Resume";
import Footer from "../footer/Footer";
import styles from "./Body.module.css";

function Body() {
  const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];
  const sections = {
    basicInfo: "Basic Info",
    summary: "Summary",
    skills: "Skills",
    workExp: "Work Experience",
    project: "Projects",
    education: "Education",
    achievement: "Achievement",
    certification: "Certification"
  };
  const resumeRef = useRef();

  const [activeColor, setActiveColor] = useState(colors[0]);
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.skills]: {
      id: sections.skills,
      sectionTitle: sections.skills,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      detail: "",
    },
    [sections.certification]: {
      id: sections.certification,
      sectionTitle: sections.certification,
      detail: [],
    },
  });

  const navigate = useNavigate();
  const { user } = useUser();

  const handleBack = (event) => {
    event.preventDefault();
    navigate('/Home');
  };

  const handleSaveResume = async () => {
    try {
      const input = document.getElementById('resume');
      const opt = {
        margin: 0.1,
        filename: `resume_${user.name}_${new Date().getTime()}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak:{mode: ['css', 'legacy']}
      };
      const pdfBlob = await html2pdf().from(input).set(opt).outputPdf('blob');
      const s3Client = new S3Client({
        region: 'eu-north-1',
        credentials: {
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        }
      });
      const fileKey = `resumes/${user.name}/${new Date().getTime()}.pdf`;
      const params = {
        Bucket: 'resume-private',
        Key: fileKey,
        Body: pdfBlob,
        ContentType: 'application/pdf'
      };
      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      const pdfUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

      const response = await axios.post('https://resume-builder-app-aooz.onrender.com/saveResume', {
        name: resumeInformation[sections.basicInfo]?.detail?.name,
        designation: resumeInformation[sections.workExp]?.details[0]?.designation,
        skills: resumeInformation[sections.skills]?.points.join(','),
        fileKey
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data.message);
      alert('Resume saved successfully');
    } catch (error) {
      console.error('Error saving resume:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      alert('Failed to save resume. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Resume Builder</p>
      <div className={styles.toolbar}>
        <div className={styles.colors}>
          {colors.map((item) => (
            <span
              key={item}
              style={{ backgroundColor: item }}
              className={`${styles.color} ${activeColor === item ? styles.active : ""}`}
              onClick={() => setActiveColor(item)}
            />
          ))}
        </div>
        <button className={styles.backR} onClick={handleBack}>Back To Home <ArrowLeft /></button>
        <ReactToPrint
          trigger={() => {
            return (
              <button>
                Download <ArrowDown />
              </button>
            );
          }}
          content={() => resumeRef.current}
        />
        <button className={styles.saveResume} onClick={handleSaveResume}>Save Resume<ArrowDown/></button>
      </div>
      <div className={styles.main}>
        <Editor
          sections={sections}
          information={resumeInformation}
          setInformation={setResumeInformation}
        />
        <Resume
          ref={resumeRef}
          sections={sections}
          information={resumeInformation}
          activeColor={activeColor}
        />
      </div>
    </div>
  );
}

export default Body;
