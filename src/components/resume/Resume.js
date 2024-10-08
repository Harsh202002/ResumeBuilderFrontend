import React, { forwardRef, useEffect, useRef } from "react";
import './Resume.css';
import axios from 'axios';
// import html2pdf from 'html2pdf.js';
import { useUser } from '../../userContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Paperclip } from "react-feather";
import styles from "./Resume.module.css";
import logo from "../../Assets/netfologo.png";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const Resume = forwardRef((props, ref) => {
  const information = props.information;
  const sections = props.sections;
  const containerRef = useRef();
  const navigate = useNavigate();
  const { user } = useUser();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (!user) {
      alert("Please login first");
      navigate('/login');
    }
  }, [user, navigate]);

  const info = {
    workExp: information[sections.workExp],
    project: information[sections.project],
    skills: information[sections.skills],
    education: information[sections.education],
    basicInfo: information[sections.basicInfo],
    summary: information[sections.summary],
    achievement: information[sections.achievement],
    certification: information[sections.certification],
  };

//   const handleSaveResume = async () => {
//     try {
//         const input = document.getElementById('resume');

//         const opt = {
//             margin:       0.1,
//             filename:     `resume_${user.name}_${new Date().getTime()}.pdf`,
//             image:        { type: 'jpeg', quality: 0.98 },
//             html2canvas:  { scale: 2 },
//             jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
//         };

//         const pdfBlob = await html2pdf().from(input).set(opt).outputPdf('blob');

//         const s3Client = new S3Client({
//             region: 'eu-north-1',
//             credentials: {
//                 accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//                 secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//             }
//         });

//         const fileKey = `resumes/${user.name}/${new Date().getTime()}.pdf`;
//         const params = {
//             Bucket: 'resume-private',
//             Key: fileKey,
//             Body: pdfBlob,
//             ContentType: 'application/pdf'
//         };

//         const command = new PutObjectCommand(params);
//         await s3Client.send(command);

//         // Generate signed URL for the uploaded file
//         const pdfUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

//         // Save resume details in MongoDB
//         const response = await axios.post('http://localhost:9002/saveResume', {
//             name: info.basicInfo.detail.name,
//             designation: info.workExp?.details[0]?.designation,
//             skills: info.skills?.points.join(','),
//             fileKey // Save the fileKey instead of pdfUrl
//         },
//         {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log(response.data.message);
//         alert('Resume saved successfully');
//     } catch (error) {
//         console.error('Error saving resume:', error);
//         if (error.response) {
//             console.error('Response data:', error.response.data);
//             console.error('Response status:', error.response.status);
//             console.error('Response headers:', error.response.headers);
//         } else if (error.request) {
//             console.error('Request data:', error.request);
//         } else {
//             console.error('Error message:', error.message);
//         }
//         alert('Failed to save resume. Please try again.');
//     }
// }


  

  const getFormattedDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    const today = new Date();
  
    // Compare the input date with today's date
    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
      return "Present";
    }
    
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!props.activeColor || !container) return;
    container.style.setProperty("--color", props.activeColor);
  }, [props.activeColor, info]);
  
  return (
    <div ref={ref} id="resume">
      <div ref={containerRef} className={styles.container}>
        <div className="resume-container">
          <header>
            <div className="header">
              <div className="left-section">
                <h1>{info.basicInfo?.detail?.name}</h1>
                <h2>{info.basicInfo?.detail?.prName}</h2>
                <p>{info.basicInfo?.detail?.address}</p>
              </div>
              <div className="right-section">
                <img src={logo} alt="Logo" />
                <p>
                  <div className={styles.links}>
                    {info.basicInfo?.detail?.email ? (
                      <p className={styles.link} type="email" href={`mailto:${info.basicInfo?.detail?.email}`}>
                        {info.basicInfo?.detail?.email}
                      </p>
                    ) : (
                      <span />
                    )}
                  </div>
                </p>
                <p>
                  {info.basicInfo?.detail?.phone ? (
                    <p className={styles.link} href={`tel:${info.basicInfo?.detail?.phone}`}>
                      {info.basicInfo?.detail?.phone}
                    </p>
                  ) : (
                    <span />
                  )}
                </p>
              </div>
            </div>
          </header>

          <section>
  <h3>Professional Summary</h3>
  <p>{info.summary?.detail}</p>

  {/* Check if there are points in the summary and map through them */}
  {Array.isArray(info.summary?.points) && info.summary.points.length > 0 && (
    <ul>
      {info.summary.points.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  )}
</section>
          <section>
            <h3>Education</h3>
            <p>
              <div className={styles.content}>
                {info.education?.details?.map((item) => (
                  <div className={styles.item} key={item.cName}>
                    {item.cName ? (
                      <p className={styles.title}><b>{item.cName} From {item.college}</b></p>
                    ) : (
                      <span />
                    )}
                    {item.startDate && item.endDate ? (
                      <div className={styles.date}>
                        <Calendar /> {getFormattedDate(item.startDate)} -
                        {getFormattedDate(item.endDate)}
                      </div>
                    ) : (
                      ""
                    )}
                    <br />
                  </div>
                ))}
              </div>
            </p>
          </section>

          <section>
            <h3>Skill Set</h3>
            <ul className="skills-list">
              {info.skills?.points?.length > 0 ? (
                <ul className={styles.hard}>
                  {info.skills?.points?.map((elem, index) => (
                    <li className={styles.hardpoint} key={elem[0] + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </ul>
          </section>

          <section>
            <h3>Work Experience</h3>

            <div className="job">
              <h4>
                <div className={styles.content}>
                  {info.workExp?.details?.map((item) => (
                    <div className={styles.item} key={item.designation}>
                      {item.designation ? (
                        <p className={styles.title}><b>{item.designation} at {item.companyName}</b></p>
                      ) : (
                        <span />
                      )}
                      {item.certificationLink ? (
                        <a className={styles.link} href={item.certificationLink}>
                          <Paperclip />
                          {item.certificationLink}
                        </a>
                      ) : (
                        <span />
                      )}
                      {item.startDate && item.endDate ? (
                        <div className={styles.date}>
                          <Calendar /> {getFormattedDate(item.startDate)}-
                          {getFormattedDate(item.endDate)}
                        </div>
                      ) : (
                        <div />
                      )}
                      {item.location ? (
                        <p className={styles.subTitle}>
                          <b>Location :  {item.location}</b>
                        </p>
                      ) : (
                        <span />
                      )}
                      <br />
                    </div>
                  ))}
                </div>
              </h4>
            </div>
          </section>
          <section>
            <h3>Projects</h3>
            <p>
              <div className={styles.content}>
                {info.project?.details?.map((item) => (
                  <div className={styles.item} key={item.pName}>
                    {item.pName ? (
                      <p className={styles.title}><b>Project : </b>{item.pName}</p>
                    ) : (
                      <span />
                    )}
                    <br />
                    {item.link ? (
                      <p className={styles.subTitle}>
                        <b>Technologies : </b>
                        {item.link}
                      </p>
                    ) : (
                      <span />
                    )}
                    <br />
                    {item.overview ? (
                      <p className={styles.overview}> <b className={styles.subTitle}>Description : </b> {item.overview} </p>
                    ) : (
                      <span />
                    )}
                    <br />
                    <p className={styles.subTitle}>Responsibilities :</p>
                    {item.points?.length > 0 ? (
                      <ul className={styles.numbered}>
                        {item.points?.map((elem, index) => (
                          <li className={styles.point} key={elem + index}>
                            {elem}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span />
                    )}
                    <br />
                  </div>
                ))}
              </div>
            </p>
          </section>

          <section>
            <h3>Certification</h3>
            <p>
              <div className={styles.content}>
                {info.certification?.points?.length > 0 ? (
                  <ul className={styles.numbered}>
                    {info.certification?.points?.map((elem, index) => (
                      <li className={styles.point} key={elem[0] + index}>
                        {elem}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span />
                )}
              </div>
            </p>
          </section>
          <section>
            <h3>Achievement</h3>
            <p>
              <div className={styles.content}>
                {info.achievement?.points?.length > 0 ? (
                  <ul className={styles.numbered}>
                    {info.achievement?.points?.map((elem, index) => (
                      <li className={styles.point} key={elem[0] + index}>
                        {elem}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span />
                )}
              </div>
            </p>
          </section>
        </div>
      </div>
      {/* <button onClick={handleSaveResume} className={styles.saveresume}>Save Resume</button> */}
    </div>
  );
});

export default Resume;



// import React, { forwardRef, useEffect, useRef } from "react";
// import './Resume.css';
// import axios from 'axios';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { useUser } from '../../userContext';
// import { useNavigate } from 'react-router-dom';

// import {
//   Calendar,
//   Paperclip,
// } from "react-feather";

// import styles from "./Resume.module.css";
// import logo from "../../Assets/netfologo.png";



// const Resume = forwardRef((props, ref) => {
//   const information = props.information;
//   const sections = props.sections;
//   const containerRef = useRef();
//   const navigate = useNavigate();
//   const { user } = useUser();
//   axios.defaults.withCredentials = true;
//   useEffect(() => {
//     if (!user) {
//       alert("Please login first");
//       navigate('/login');
//     }
//   }, [user, navigate]);

//   const info = {
//     workExp: information[sections.workExp],
//     project: information[sections.project],
//     skills: information[sections.skills],
//     education: information[sections.education],
//     basicInfo: information[sections.basicInfo],
//     summary: information[sections.summary],
//     achievement: information[sections.achievement],
//     certification: information[sections.certification],
//   };

//   const handleSaveResume = async () => {
//     try {
//       const input = document.getElementById('resume');
//       const canvas = await html2canvas(input);
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'portrait',
//         unit: 'px',
//         format: [660, canvas.height]
//       });
//       pdf.addImage(imgData, 'PNG', 0, 0, 660, canvas.height);
//       const pdfBlob = pdf.output('blob');

//       const formData = new FormData();
//       formData.append('resumePdf', pdfBlob, 'resume.pdf');
//       formData.append('name', info.basicInfo?.detail?.name);
//       formData.append('designation', info.workExp?.details[0]?.designation);
//       formData.append('skills', info.skills?.points.join(','));

//       await axios.post('https://resume-builder-app-aooz.onrender.com/saveResume', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//         withCredentials: true
//       });

//       alert('Resume saved successfully!');
//     } catch (error) {
//       console.error('Error saving resume:', error);
//       alert('Failed to save resume');
//     }
//   };

//   const getFormattedDate = (value) => {
//     if (!value) return "";
//     const date = new Date(value);

//     return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
//   };

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!props.activeColor || !container) return;

//     container.style.setProperty("--color", props.activeColor);
//   }, [props.activeColor, info]);

//   console.log(info);

//   return (
//     <div ref={ref} id="resume">
//       <div ref={containerRef} className={styles.container}>
//         <div className="resume-container">
//           <header>
//             <div className="header">
//               <div className="left-section">
//                 <h1>{info.basicInfo?.detail?.name}</h1>
//                 <h2>{info.basicInfo?.detail?.prName}</h2>
//                 <p>{info.basicInfo?.detail?.address}</p>
//               </div>
//               <div className="right-section">
//                 <img src={logo} alt="Logo" />
//                 <p>
//                   <div className={styles.links}>
//                     {info.basicInfo?.detail?.email ? (
//                       <p className={styles.link} type="email" href={`mailto:${info.basicInfo?.detail?.email}`}>
//                         {info.basicInfo?.detail?.email}
//                       </p>
//                     ) : (
//                       <span />
//                     )}
//                   </div>
//                 </p>
//                 <p>
//                   {info.basicInfo?.detail?.phone ? (
//                     <p className={styles.link} href={`tel:${info.basicInfo?.detail?.phone}`}>
//                       {info.basicInfo?.detail?.phone}
//                     </p>
//                   ) : (
//                     <span />
//                   )}
//                 </p>
//               </div>
//             </div>
//           </header>

//           <section>
//             <h3>Professional Summary</h3>
//             <p>{info.summary?.detail}</p>
//           </section>
//           <section>
//             <h3>Education</h3>
//             <p>
//               <div className={styles.content}>
//                 {info.education?.details?.map((item) => (
//                   <div className={styles.item} key={item.cName}>
//                     {item.cName ? (
//                       <p className={styles.title}><b>{item.cName} From {item.college}</b></p>
//                     ) : (
//                       <span />
//                     )}
//                     {item.startDate && item.endDate ? (
//                       <div className={styles.date}>
//                         <Calendar /> {getFormattedDate(item.startDate)} -
//                         {getFormattedDate(item.endDate)}
//                       </div>
//                     ) : (
//                       ""
//                     )}
//                     <br />
//                   </div>
//                 ))}
//               </div>
//             </p>
//           </section>

//           <section>
//             <h3>Skill Set</h3>
//             <ul className="skills-list">
//               {info.skills?.points?.length > 0 ? (
//                 <ul className={styles.hard}>
//                   {info.skills?.points?.map((elem, index) => (
//                     <li className={styles.hardpoint} key={elem[0] + index}>
//                       {elem}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <span />
//               )}
//             </ul>
//           </section>

//           <section>
//             <h3>Work Experience</h3>

//             <div className="job">
//               <h4>
//                 <div className={styles.content}>
//                   {info.workExp?.details?.map((item) => (
//                     <div className={styles.item} key={item.designation}>
//                       {item.designation ? (
//                         <p className={styles.title}><b>{item.designation} at {item.companyName}</b></p>
//                       ) : (
//                         <span />
//                       )}
//                       {item.certificationLink ? (
//                         <a className={styles.link} href={item.certificationLink}>
//                           <Paperclip />
//                           {item.certificationLink}
//                         </a>
//                       ) : (
//                         <span />
//                       )}
//                       {item.startDate && item.endDate ? (
//                         <div className={styles.date}>
//                           <Calendar /> {getFormattedDate(item.startDate)}-
//                           {getFormattedDate(item.endDate)}
//                         </div>
//                       ) : (
//                         <div />
//                       )}
//                       {item.location ? (
//                         <p className={styles.subTitle}>
//                           <b>Location :  {item.location}</b>
//                         </p>
//                       ) : (
//                         <span />
//                       )}
//                       <br />
//                     </div>
//                   ))}
//                 </div>
//               </h4>
//             </div>
//           </section>
//           <section>
//             <h3>Projects</h3>
//             <p>
//               <div className={styles.content}>
//                 {info.project?.details?.map((item) => (
//                   <div className={styles.item} key={item.pName}>
//                     {item.pName ? (
//                       <p className={styles.title}><b>Project : </b>{item.pName}</p>
//                     ) : (
//                       <span />
//                     )}
//                     <br />
//                     {item.link ? (
//                       <p className={styles.subTitle}>
//                         <b>Technologies : </b>
//                         {item.link}
//                       </p>
//                     ) : (
//                       <span />
//                     )}
//                     <br />
//                     {item.overview ? (
//                       <p className={styles.overview}> <b className={styles.subTitle}>Description : </b> {item.overview} </p>
//                     ) : (
//                       <span />
//                     )}
//                     <br />
//                     <p className={styles.subTitle}>Responsibilities :</p>
//                     {item.points?.length > 0 ? (
//                       <ul className={styles.numbered}>
//                         {item.points?.map((elem, index) => (
//                           <li className={styles.point} key={elem + index}>
//                             {elem}
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <span />
//                     )}
//                     <br />
//                   </div>
//                 ))}
//               </div>
//             </p>
//           </section>

//           <section>
//             <h3>Certification</h3>
//             <p>
//               <div className={styles.content}>
//                 {info.certification?.points?.length > 0 ? (
//                   <ul className={styles.numbered}>
//                     {info.certification?.points?.map((elem, index) => (
//                       <li className={styles.point} key={elem[0] + index}>
//                         {elem}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <span />
//                 )}
//               </div>
//             </p>
//           </section>
//           <section>
//             <h3>Achievement</h3>
//             <p>
//               <div className={styles.content}>
//                 {info.achievement?.points?.length > 0 ? (
//                   <ul className={styles.numbered}>
//                     {info.achievement?.points?.map((elem, index) => (
//                       <li className={styles.point} key={elem[0] + index}>
//                         {elem}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <span />
//                 )}
//               </div>
//             </p>
//           </section>
//         </div>
//       </div>
//       <button onClick={handleSaveResume} className={styles.saveresume}>Save Resume</button>
//     </div>
//   );
// });

// export default Resume;
