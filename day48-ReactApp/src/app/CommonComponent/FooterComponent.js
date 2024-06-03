import React from "react";

let Footer = () => {
    return ( //return is same as render()

        //JSX is a Javascript Like XML structure (not html, not xml - but js)
        <>
            <div className="footer">
                © Copyright 2023 All rights reserved. &nbsp;|&nbsp;
                <a href="https://www.synergisticit.com/" target="_blank">SynergisticIT</a> &nbsp;|&nbsp;
                <a href="http://www.synergisticit.com/sitemap.xml" target="_blank">Sitemap</a>
            </div>
        </>
    )
}

export default Footer;