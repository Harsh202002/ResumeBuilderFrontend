import React from 'react'
import styles from './Header.module.css'
import resumeSvg from "../../Assets/resume1.svg"

 function Header() {
  
    return(
        
     <div className= {styles.container}>
        <div className={styles.left}>
        <p className={styles.heading}>
             <span>Netfotech</span> Solutions
        </p>
        <p className={styles.heading}>
            Turns Ideas into <span>Reality</span>
        </p>

    </div>
    <div className={styles.right}>
        <img src={resumeSvg} alt='Resume'/>
    </div>
    </div>
    );
  
}

export default Header;
