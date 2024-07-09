import React ,{useState, useEffect} from 'react'
import styles from "./Editor.module.css";
import InputControl from '../InputControl/Inputcontrol';
import { X } from "react-feather";

function Editor(props) {
    const sections = props.sections;
    const information = props.information;

    const [activeSectionKey, setActiveSectionKey] = useState(
        Object.keys(sections)[0]
      );
      const [activeInformation, setActiveInformation] = useState(
        information[sections[Object.keys(sections)[0]]]
      );
      const [sectionTitle, setSectionTitle] = useState(
        sections[Object.keys(sections)[0]]
      );
      const [activeDetailIndex, setActiveDetailIndex] = useState(0);
      
      const [values, setvalues] = useState({
        name: activeInformation?.detail?.name || "",
        pName: activeInformation?.detail?.pName || "",
        cName: activeInformation?.detail?.cName || "",
        prName: activeInformation?.detail?.prName || "",
        linkedin: activeInformation?.detail?.linkedin || "",
        github: activeInformation?.detail?.github || "",
        phone: activeInformation?.detail?.phone || "",
        email: activeInformation?.detail?.email || "",
        startDate : '',
        endDate: ''
      });

      const handlePointUpdate = (value, index) => {
        const tempvalues = { ...values };
        if (!Array.isArray(tempvalues.points)) tempvalues.points = [];
        tempvalues.points[index] = value;
        setvalues(tempvalues);
      };

      const workExpBody = (
        <div className={styles.detail}>
          <div className={styles.row}>
            <InputControl
              label="Designation"
              placeholder="Enter title eg. Frontend developer"
              value={values.designation}
              onChange={(event) =>
                setvalues((prev) => ({ ...prev, designation: event.target.value }))
              }
            />
            <InputControl
              label="Company Name"
              placeholder="Enter company name eg. amazon"
              value={values.companyName}
              onChange={(event) =>
                setvalues((prev) => ({ ...prev, companyName: event.target.value }))
              }
            />
          </div>
          <div className={styles.row}>
            <InputControl
              label="Location"
              placeholder="Enter location eg. Remote/On-Site"
              value={values.location}
              onChange={(event) =>
                setvalues((prev) => ({ ...prev, location: event.target.value }))
              }
            />
          </div>
          <div className={styles.row}>
            <InputControl
              label="Start Date"
              type="date"
              placeholder="Enter start date of work"
              value={values.startDate}
              onChange={(event) => {

                const currDate = new Date();
                const selectedDate = new Date(event.target.value)

                // console.log(currDate);

                if(currDate < selectedDate){
                  alert("Invalid date Input");
                  setvalues((prev) => ({ ...prev, startDate: '' }))
                  return;
                }

                setvalues((prev) => ({ ...prev, startDate: event.target.value }))

              }
              }
            />
            <InputControl
              label="End Date"
              type="date"
              placeholder="Enter end date of work"
              value={values.endDate}
              onChange={(event) => {

                const currDate = new Date();
                const selectedDate = new Date(event.target.value)

                // console.log(currDate);

                if(selectedDate > currDate){
                  alert("Invalid date Input");
                  setvalues((prev) => ({ ...prev, endDate: '' }))
                  return;
                }

                setvalues((prev) => ({ ...prev, endDate: event.target.value }))
              }
              }
            />
          </div>
        </div>
      );

      const projectBody = (
        <div className={styles.detail}>
          <div className={styles.row}>
            <InputControl
              label="Name of your Project"
              value={values.pName}
              placeholder="Enter title eg. Chat app"
              required
              onChange={(event) =>
                setvalues((prev) => ({ ...prev, pName: event.target.value }))
              }
            />
          <InputControl
            label="Description"
            value={values.overview}
            placeholder="Enter basic Description of project"
            required
            onChange={(event) =>
              setvalues((prev) => ({ ...prev, overview: event.target.value }))
            }
          />
          </div>
          <div className={styles.row}>
            <InputControl
              label="Technologies"
              value={values.link}
              placeholder="Enter deployed link of project"
              required
              onChange={(event) =>
                setvalues((prev) => ({ ...prev, link: event.target.value }))
              }
            />
          </div>
          <div className={styles.column}>
            <label>Enter project Responsibilities</label>
            <InputControl
              placeholder="Line 1"
              value={values.points ? values.points[0] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 0)}
            />
            <InputControl
              placeholder="Line 2"
              value={values.points ? values.points[1] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 1)}
            />
            <InputControl
              placeholder="Line 3"
              value={values.points ? values.points[2] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 2)}
            />
            <InputControl
              placeholder="Line 4"
              value={values.points ? values.points[3] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 3)}
            />
          </div>
        </div>
      );
      const educationBody = (
        <div className={styles.detail}>
          <div className={styles.row}>
            <InputControl
              label="Course"
              value={values.cName}
              placeholder="Enter title eg. B-tech"
              required
              onChange={(event) =>
                setvalues((prev) => ({ ...prev, cName: event.target.value }))
              }
            />
          </div>
          <InputControl
            label="College/School Name"
            value={values.college}
            placeholder="Enter name of your college/school"
            required
            onChange={(event) =>
              setvalues((prev) => ({ ...prev, college: event.target.value }))
            }
          />
          <div className={styles.row}>
            <InputControl
              label="Start Date"
              type="date"
              placeholder="Enter start date of this education"
              required
              value={values.startDate}
              onChange={(event) => {

                const currDate = new Date();
                const selectedDate = new Date(event.target.value)

                // console.log(currDate);

                if(currDate < selectedDate){
                  alert("Invalid date Input");
                  setvalues((prev) => ({ ...prev, startDate: '' }))
                  return;
                }

                setvalues((prev) => ({ ...prev, startDate: event.target.value }))

              }
              }
            />
            <InputControl
              label="End Date"
              type="date"
              placeholder="Enter end date of this education"
              required
              value={values.endDate}
              onChange={(event) => {

                const currDate = new Date();
                const selectedDate = new Date(event.target.value)

                // console.log(currDate);

                if(selectedDate > currDate){
                  alert("Invalid date Input");
                  setvalues((prev) => ({ ...prev, endDate: '' }))
                  return;
                }

                setvalues((prev) => ({ ...prev, endDate: event.target.value }))
              }
              }
            />
          </div>
        </div>
      );
      const basicInfoBody = (
        <div className={styles.detail}>
          <div className={styles.row}>
            <InputControl
              label="Full Name"
              placeholder="Enter your full name eg. Aashu"
              required
              value={values.name}
              onChange={(event) =>
                setvalues((prev) => ({ ...prev, name: event.target.value }))
              } 
            />
            <InputControl
              label="Profession"
              value={values.prName}
              placeholder="Enter your title eg. Frontend developer"
              required
              onChange={(event) =>
                setvalues((prev) => ({ ...prev, prName: event.target.value }))
              }
            />
          </div>
          <div className={styles.row}>
            <InputControl
              label="Email Address"
              value={values.email}
              placeholder="Enter your email"
              required
              onChange={(event) =>
                setvalues((prev) => ({ ...prev, email: event.target.value }))
              }
            />
            <InputControl
              label="Enter phone No."
              value={values.phone}
              placeholder="Enter your phone number"
              required
              onChange={(event) =>
                setvalues((prev) => ({ ...prev, phone: event.target.value }))
              }
            />
            </div>
            <div className={styles.row}>
            <InputControl
              label="Address"
              value={values.address}
              placeholder="Enter your Adress"
              onChange={(event) =>
                setvalues((prev) => ({ ...prev, address: event.target.value }))
              }
            />
            </div>
          
        </div>
      );
      const skillsBody = (
        <div className={styles.detail}>
          <div className={styles.column}>
            <label>List your Skills</label>
            <InputControl
              placeholder="Skills 1"
              value={values.points ? values.points[0] : "Technologies : "}
              onChange={(event) => handlePointUpdate(event.target.value, 0)}
            />
            <InputControl
              placeholder="Skills 2"
              value={values.points ? values.points[1] : "Languages : "}
              onChange={(event) => handlePointUpdate(event.target.value, 1)}
            />
            <InputControl
              placeholder="Skills 3"
              value={values.points ? values.points[2] : "Database : "}
              onChange={(event) => handlePointUpdate(event.target.value, 2)}
            />
            <InputControl
              placeholder="Skills 4"
              value={values.points ? values.points[3] : "IDE Used : "}
              onChange={(event) => handlePointUpdate(event.target.value, 3)}
            />
            <InputControl
              placeholder="Skills 5"
              value={values.points ? values.points[4] :"Webserver : "}
              onChange={(event) => handlePointUpdate(event.target.value, 4)}
            />
             <InputControl
              placeholder="Skills 6"
              value={values.points ? values.points[5] :"Operating System : "}
              onChange={(event) => handlePointUpdate(event.target.value, 5 )}
            />
          </div>
        </div>
      );
      const certificationBody = (
        <div className={styles.detail}>
          <div className={styles.column}>
            <label>List your Certificates</label>
            <InputControl
              placeholder="Certificate 1"
              value={values.points ? values.points[0] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 0)}
            />
            <InputControl
              placeholder="Certificate 2"
              value={values.points ? values.points[1] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 1)}
            />
            <InputControl
              placeholder="Certificate 3"
              value={values.points ? values.points[2] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 2)}
            />
            <InputControl
              placeholder="Certificate 4"
              value={values.points ? values.points[3] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 3)}
            />
            <InputControl
              placeholder="Certificate 5"
              value={values.points ? values.points[4] :""}
              onChange={(event) => handlePointUpdate(event.target.value, 4)}
            />
             <InputControl
              placeholder="Certificate 6"
              value={values.points ? values.points[5] :""}
              onChange={(event) => handlePointUpdate(event.target.value, 5 )}
            />
          </div>
        </div>
      );
      const summaryBody = (
        <div className={styles.detail}>
          <InputControl
            label="Summary"
            value={values.summary}
            placeholder="Enter your objective/summary"
            required
            onChange={(event) =>
              setvalues((prev) => ({ ...prev, summary: event.target.value }))
            }
          />
        </div>
      );
      
      const achievementBody = (
        <div className={styles.detail}>
          <div className={styles.column}>
            <label>List your Achievement</label>
            <InputControl
              placeholder="Achievement 1"
              value={values.points ? values.points[0] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 0)}
            />
            <InputControl
              placeholder="Achievement 2"
              value={values.points ? values.points[1] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 1)}
            />
            <InputControl
              placeholder="Achievement 3"
              value={values.points ? values.points[2] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 2)}
            />
            <InputControl
              placeholder="Achievement 4"
              value={values.points ? values.points[3] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 3)}
            />
            <InputControl
              placeholder="Achievement 5"
              value={values.points ? values.points[4] :""}
              onChange={(event) => handlePointUpdate(event.target.value, 4)}
            />
             <InputControl
              placeholder="Achievement 6"
              value={values.points ? values.points[5] :""}
              onChange={(event) => handlePointUpdate(event.target.value, 5 )}
            />
          </div>
        </div>
      );
      const generateBody = () => {
        switch (sections[activeSectionKey]) {
          case sections.basicInfo:
            return basicInfoBody;
          case sections.summary:
            return summaryBody;
          case sections.skills:
            return skillsBody;
          case sections.workExp:
            return workExpBody;
          case sections.project:
            return projectBody;
          case sections.education:
            return educationBody;
          case sections.certification:
            return certificationBody;
          case sections.achievement:
            return achievementBody;
          default:
            return null;
        }
      };

      const handleSubmission = () => {
       
        // const requiredFields = [
        //   "name",
          
        //   "email",
        //   "phone",

          
        // ];
        // for (let field of requiredFields) {
        //   if (!values[field]) {
        //     alert(`Please fill out the ${field} field.`);
        //     return;
        //   }
        // }

        switch (sections[activeSectionKey]) {
          case sections.basicInfo: {
            const tempDetail = {
              name: values.name,
              prName: values.prName,
              linkedin: values.linkedin,
              github: values.github,
              email: values.email,
              phone: values.phone,
              address: values.address,
            };
            if(values.name==0){
              alert("please Fill the name field")
              break;
            }
            if(values.prName==0){
              alert("please Fill the Profession field")
              break;
            }
            if(values.email==0){
              alert("please Fill the email field")
              break;
            }
            if(values.phone==0){
              alert("please Fill the phone field")
              break;
            }
            
            props.setInformation((prev) => ({
              ...prev,
              [sections.basicInfo]: {
                ...prev[sections.basicInfo],
                detail: tempDetail,
                sectionTitle,
              },
            }));
            break;
          }
          case sections.skills: {
            const tempPoints = values.points;
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.skills]: {
                ...prev[sections.skills],
                points: tempPoints,
                sectionTitle,
              },
            }));
            break;
          }
          case sections.workExp:{
            const tempDetail = {
              certificationLink: values.certificationLink,
              designation: values.designation,
              startDate: values.startDate,
              endDate: values.endDate,
              companyName: values.companyName,
              location: values.location,
              points: values.points,
            };

            const startExpDate = new Date(tempDetail.startDate);
            const endExpDate = new Date(tempDetail.endDate);

            if(startExpDate >= endExpDate){
              alert("StartDate can not be greater than end date")
              return;
            }
           

            const tempDetails = [...information[sections.workExp]?.details];
            tempDetails[activeDetailIndex] = tempDetail;
            if(values.designation!=0){
              if(values.companyName==0){
                alert("please Fill the Company Name")
                break;
              }else if(values.location==0){
                alert("please Fill the Location field")
                break;
              }
              else if(values.startDate==0){
                alert("please Fill the start date")
                break;
              }else if(values.endDate==0){
                alert("please Fill the end Date")
                break;
              }
              
            }
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.workExp]: {
                ...prev[sections.workExp],
                details: tempDetails,
                sectionTitle,
              },
            }));
            break;
          }
          case sections.project: {
            const tempDetail = {
              pName: values.pName,
              link: values.link,
              overview: values.overview,
              github: values.github,
              points: values.points,
            };
           
            const tempDetails = [...information[sections.project]?.details];
            tempDetails[activeDetailIndex] = tempDetail;
            if(values.pName==0){
              alert("please Fill the Project name field")
              break;
            }
            if(values.overview==0){
              alert("please Fill the Overview field")
              break;
            }
            if(values.link==0){
              alert("please Fill the Technologies field")
              break;
            }
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.project]: {
                ...prev[sections.project],
                details: tempDetails,
                sectionTitle,
              },
            }));
            break;
          }
          case sections.education: {
            const tempDetail = {
              cName: values.cName,
              college: values.college,
              startDate: values.startDate,
              endDate: values.endDate,
            };
            const startExpDate = new Date(tempDetail.startDate);
            const endExpDate = new Date(tempDetail.endDate);

            if(startExpDate >= endExpDate){
              alert("StartDate can not be greater than end date")
              return;
            }
            const tempDetails = [...information[sections.education]?.details];
            tempDetails[activeDetailIndex] = tempDetail;
            if(values.cName==0){
              alert("please Fill the Course field")
              break;
            }
            if(values.college==0){
              alert("please Fill the College field")
              break;
            }
            if(values.startDate==0){
              alert("please Fill start date")
              break;
            }
            if(values.endDate==0){
              alert("please Fill End date")
              break;
            }
            
            props.setInformation((prev) => ({
              ...prev,
              [sections.education]: {
                ...prev[sections.education],
                details: tempDetails,
                sectionTitle,
              },
            }));
            break;
          }
          
            case sections.certification: {
              const tempPoints = values.points;
      
              props.setInformation((prev) => ({
                ...prev,
                [sections.certification]: {
                  ...prev[sections.certification],
                  points: tempPoints,
                  sectionTitle,
                },
              }));
              break;
          }
          case sections.summary: {
            const tempDetail = values.summary;
            if(values.summary==0){
              alert("please Fill the summary field")
              break;
            }
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.summary]: {
                ...prev[sections.summary],
                detail: tempDetail,
                sectionTitle,
              },
            }));
            break;
          }
          case sections.achievement: {
            const tempPoints = values.points;
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.achievement]: {
                ...prev[sections.achievement],
                points: tempPoints,
                sectionTitle,
              },
            }));
            break;
        }
        }
      };

      const handleAddNew = () => {
        const details = activeInformation?.details;
        if (!details) return;
        const lastDetail = details.slice(-1)[0];
        if (!Object.keys(lastDetail).length) return;
        details?.push({});
    
        props.setInformation((prev) => ({
          ...prev,
          [sections[activeSectionKey]]: {
            ...information[sections[activeSectionKey]],
            details: details,
          },
        }));
        setActiveDetailIndex(details?.length - 1);
      };

      const handleDeleteDetail = (index) => {
        const details = activeInformation?.details
          ? [...activeInformation?.details]
          : "";
        if (!details) return;
        details.splice(index, 1);
        props.setInformation((prev) => ({
          ...prev,
          [sections[activeSectionKey]]: {
            ...information[sections[activeSectionKey]],
            details: details,
          },
        }));
    
        setActiveDetailIndex((prev) => (prev === index ? 0 : prev - 1));
      };

      useEffect(() => {
        const activeInfo = information[sections[activeSectionKey]];
        setActiveInformation(activeInfo);
        setSectionTitle(sections[activeSectionKey]);
        setActiveDetailIndex(0);
        setvalues({
          name: activeInfo?.detail?.name || "",
          overview: activeInfo?.details
            ? activeInfo.details[0]?.overview || ""
            : "",
          link: activeInfo?.details ? activeInfo.details[0]?.link || "" : "",
          certificationLink: activeInfo?.details
            ? activeInfo.details[0]?.certificationLink || ""
            : "",
          companyName: activeInfo?.details
            ? activeInfo.details[0]?.companyName || ""
            : "",
          college: activeInfo?.details
            ? activeInfo.details[0]?.college || ""
            : "",
          location: activeInfo?.details
            ? activeInfo.details[0]?.location || ""
            : "",
          startDate: activeInfo?.details
            ? activeInfo.details[0]?.startDate || ""
            : "",
          endDate: activeInfo?.details ? activeInfo.details[0]?.endDate || "" : "",
          points: activeInfo?.details
            ? activeInfo.details[0]?.points
              ? [...activeInfo.details[0]?.points]
              : ""
            : activeInfo?.points
            ? [...activeInfo.points]
            : "",
          designation: activeInfo?.details
            ? activeInfo.details[0]?.designation || ""
            : activeInfo?.detail?.designation || "",
          prName: activeInfo?.details
            ? activeInfo.details[0]?.prName || ""
            : activeInfo?.detail?.prName || "",
          linkedin: activeInfo?.detail?.linkedin || "",
          github: activeInfo?.details
            ? activeInfo.details[0]?.github || ""
            : activeInfo?.detail?.github || "",
          phone: activeInfo?.detail?.phone || "",
          email: activeInfo?.detail?.email || "",
          summary: typeof activeInfo?.detail !== "object" ? activeInfo.detail : "",
          achievement: typeof activeInfo?.detail !== "object" ? activeInfo.detail : "",
          skills: typeof activeInfo?.detail !== "object" ? activeInfo.detail : "",
          pName: activeInfo?.details
          ? activeInfo.details[0]?.pName || ""
          : activeInfo?.detail?.pName || "",
          cName: activeInfo?.details
          ? activeInfo.details[0]?.cName || ""
          : activeInfo?.detail?.cName || "",
        });
      }, [activeSectionKey]);
    
      useEffect(() => {
        setActiveInformation(information[sections[activeSectionKey]]);
        setSectionTitle(sections[activeSectionKey]);
      }, [information]);
    
      useEffect(() => {
        const details = activeInformation?.details;
        if (!details) return;
    
        const activeInfo = information[sections[activeSectionKey]];
        setvalues({
          overview: activeInfo.details[activeDetailIndex]?.overview || "",
          link: activeInfo.details[activeDetailIndex]?.link || "",
          certificationLink:
            activeInfo.details[activeDetailIndex]?.certificationLink || "",
          companyName: activeInfo.details[activeDetailIndex]?.companyName || "",
          location: activeInfo.details[activeDetailIndex]?.location || "",
          startDate: activeInfo.details[activeDetailIndex]?.startDate || "",
          endDate: activeInfo.details[activeDetailIndex]?.endDate || "",
          points: activeInfo.details[activeDetailIndex]?.points || "",
          designation: activeInfo.details[activeDetailIndex]?.designation || "",
          linkedin: activeInfo.details[activeDetailIndex]?.linkedin || "",
          github: activeInfo.details[activeDetailIndex]?.github || "",
          college: activeInfo.details[activeDetailIndex]?.college || "",
        });
      }, [activeDetailIndex]);
    
    
    
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            {Object.keys(sections)?.map((key)=>(
                <div 
                className={`${styles.section} ${
                    activeSectionKey=== key ? styles.active :""
                }`}
                key={key}
                onClick={()=> setActiveSectionKey(key)}
                > 
                    {sections[key]}
                </div>
            ))}
        </div>

        <div className={styles.body}>
            <InputControl label="Title" placeholder ="Enter your section title"
            value={sectionTitle}
            onChange={(event) => setSectionTitle(event.target.value)}
            />

            <div className={styles.chips}>
          {activeInformation?.details
            ? activeInformation?.details?.map((item, index) => (
                <div
                  className={`${styles.chip} ${
                    activeDetailIndex === index ? styles.active : ""
                  }`}
                  key={item.title + index}
                  onClick={() => setActiveDetailIndex(index)}
                >
                  <p>
                    {sections[activeSectionKey]} {index + 1}
                  </p>
                  <X
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteDetail(index);
                    }}
                  />
                </div>
              ))
            : ""}
          {activeInformation?.details &&
          activeInformation?.details?.length > 0 ? (
            <div className={styles.new} onClick={handleAddNew}>
              +New
            </div>
          ) : (
            ""
          )}
        </div>

            {generateBody()}
            <button onClick={handleSubmission}>Save</button>

        </div>
      
    </div>
  )
}

export default Editor
