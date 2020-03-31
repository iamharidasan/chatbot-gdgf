import React, { Fragment } from "react"

const Footer = () => {
  return (
    <Fragment>
      <footer>
        <div className="container-fluid">
          <div className="makemy">
            <a className="pro_bold" href="#form_home">
              Make My Brand Viral
            </a>
          </div>
          <div className="row">
            <div className="col-sm-6 copy_te">
              <p>
                Designed and Developed <strong>by SocialBeat</strong>
              </p>
            </div>
            <div className="col-sm-6">
              <ul className="social_btn social_link">
                <li>
                  <a
                    href="https://www.influencer.in/terms-and-conditions/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms
                  </a>
                </li>
                <li> |</li>
                <li>
                  <a
                    href="https://www.influencer.in/contact/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact Us
                  </a>
                </li>
                <li> | </li>
                <li>
                  <a
                    href="https://www.influencer.in/privacy-policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>{" "}
                </li>
                <li>| </li>
                <li>
                  <a
                    href="https://www.influencer.in/disclosure/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Disclosure
                  </a>
                </li>
              </ul>
              <ul className="social_btn soc_img">
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/influencer.in/"
                  >
                    <img
                      src="https://www.influencer.in/wp-content/themes/influencer/LP-tiktok-templates/img/socialicon1.png"
                      alt=""
                    />
                  </a>
                </li>
                <li> |</li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/influencer.in/ "
                  >
                    <img
                      src="https://www.influencer.in/wp-content/themes/influencer/LP-tiktok-templates/img/socialicon2.png"
                      alt=""
                    />
                  </a>
                </li>
                <li> | </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/SpotInfluencer"
                  >
                    <img
                      src="https://www.influencer.in/wp-content/themes/influencer/LP-tiktok-templates/img/socialicon3.png"
                      alt=""
                    />
                  </a>
                </li>
                <li>| </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.youtube.com/channel/UC7xyBD-plsZ9vJlstGKc7zg"
                  >
                    <img
                      src="https://www.influencer.in/wp-content/themes/influencer/LP-tiktok-templates/img/socialicon5.png"
                      alt=""
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <div className="stricku_btn">
        <a className="pro_bold" href="#form_home">
          Make My Brand Viral
        </a>
      </div>
    </Fragment>
  )
}

export default Footer
