import React from "react";
import styled from "styled-components";
import Nav from "../../../components/shared/Nav";
import { types } from "../../../constants";
import { components } from "../../../themes";
import * as Head from "../../../components/specific/Head";

const Page = styled.div`
  width: 100%;
`;

const Top = styled.div`
  ${props => props.theme.animations.gradientMovementCss}
  background: ${props => props.theme.gradients.primary};
  position: relative;
  width: 100%;
`;

const TopContent = styled.div`
  z-index: 200;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopUnderlay = styled.div`
  z-index: 100;
  position: absolute;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > * {
    margin: 0 auto;
    width: 100%;
    max-width: 1150px;
  }

  line-height: 1.5;
`;

const Canvas = styled(components.Canvas)`
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 300px;
  width: 100%;
  padding-bottom: calc(${props => props.theme.sizes.navHeight});
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-items: center;
  padding: calc(2 * ${props => props.theme.sizes.edge}) 0 calc(1 * ${props => props.theme.sizes.edge});
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.white};
  font-size: 30pt;
  font-weight: 600;
  font-family: ${props => props.theme.fonts.primary};
  letter-spacing: -1.4px;
  line-height: 1.3;
  max-width: 500px;
  margin-top: 0;
  margin-bottom: calc(2 * ${props => props.theme.sizes.edge});

  @media ${props => props.theme.medias.medium} {
    font-size: 36pt;
    text-align: center;
    width: 100%;
    max-width: 100%;
  }
`;

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.white};
  font-size: 15pt;
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 300;
  margin: 0;
  @media ${props => props.theme.medias.medium} {
    font-size: 12pt;
    width: 100%;
    text-align: center;
  }
`;

function Terms() {
  return (
    <Page>
      <Head.Landing />
      <Top>
        <TopContent>
          <Nav appearance={types.nav.appearance.presentation} />
          <Canvas>
            <Left>
              <Title>Terms & Conditions</Title>
              <Subtitle>Rules and Policies</Subtitle>
            </Left>
          </Canvas>
        </TopContent>
        <TopUnderlay />
      </Top>
      <Main>
        <div>
          <div>
            <h2>ConnSuite Terms & Conditions</h2>
            <h3>1. Terms</h3>
            <p>
              By accessing the website at <a href="https://www.connsuite.com">https://www.connsuite.com</a>, you are agreeing to be bound by
              these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any
              applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The
              materials contained in this website are protected by applicable copyright and trademark law.
            </p>
            <h3>2. Use License</h3>
            <ol type="a">
              <li>
                Permission is granted to temporarily download one copy of the materials (information or software) on ConnSuite&apos;s
                website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and
                under this license you may not:
                <ol type="i">
                  <li>modify or copy the materials;</li>
                  <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                  <li>attempt to decompile or reverse engineer any software contained on ConnSuite&apos;s website;</li>
                  <li>remove any copyright or other proprietary notations from the materials; or</li>
                  <li>transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
                </ol>
              </li>
              <li>
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by ConnSuite at
                any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any
                downloaded materials in your possession whether in electronic or printed format.
              </li>
            </ol>
            <h3>3. Disclaimer</h3>
            <ol type="a">
              <li>
                The materials on ConnSuite&apos;s website are provided on an &apos;as is&apos; basis. ConnSuite makes no warranties,
                expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied
                warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property
                or other violation of rights.
              </li>
              <li>
                Further, ConnSuite does not warrant or make any representations concerning the accuracy, likely results, or reliability of
                the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
              </li>
            </ol>
            <h3>4. Limitations</h3>
            <p>
              In no event shall ConnSuite or its suppliers be liable for any damages (including, without limitation, damages for loss of
              data or profit, or due to business interruption) arising out of the use or inability to use the materials on ConnSuite&apos;s
              website, even if ConnSuite or a ConnSuite authorized representative has been notified orally or in writing of the possibility
              of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for
              consequential or incidental damages, these limitations may not apply to you.
            </p>
            <h3>5. Accuracy of materials</h3>
            <p>
              The materials appearing on ConnSuite website could include technical, typographical, or photographic errors. ConnSuite does
              not warrant that any of the materials on its website are accurate, complete or current. ConnSuite may make changes to the
              materials contained on its website at any time without notice. However ConnSuite does not make any commitment to update the
              materials.
            </p>
            <h3>6. Links</h3>
            <p>
              ConnSuite has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked
              site. The inclusion of any link does not imply endorsement by ConnSuite of the site. Use of any such linked website is at the
              user&apos;s own risk.
            </p>
            <h3>7. Modifications</h3>
            <p>
              ConnSuite may revise these terms of service for its website at any time without notice. By using this website you are agreeing
              to be bound by the then current version of these terms of service.
            </p>
            <h3>8. Governing Law</h3>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Romania and you irrevocably submit to
              the exclusive jurisdiction of the courts in that State or location.
            </p>

            <h2>Privacy Policy</h2>
            <p>Your privacy is important to us.</p>
            <p>We don’t ask for your personal information unless we truly need it.</p>
            <p>
              It is ConnSuite&apos;s policy to respect your privacy regarding any information we may collect from you across our website,{" "}
              <a href="https://www.connsuite.com">https://www.connsuite.com</a>.{" "}
            </p>
            <h3>Personal Information</h3>
            <p>
              We may ask you for personal information, such as your name, email, address, contact details and payment details. We collect
              only the personal information relevant to providing you with a service, and use your information only to ensure the fulfilment
              of this service. You are free to refuse our request for your personal information, with the understanding that we may be
              unable to provide you with some of your desired services without this information.
            </p>
            <p>
              We do not share your personal information with third-parties, except where required by law or to protect our own rights. We
              will only retain personal information for as long as necessary to provide you with a service.
            </p>
            <h3>Cookies</h3>
            <p>
              We use &quot;cookies&quot; to collect information about you and your activity across our site. A cookie is a small piece of
              data that our website stores on your computer, and accesses each time you visit so we can understand how you use our site and
              serve you content based on preferences you have specified.
            </p>
            <p>
              If you do not wish to accept cookies from us, you should instruct your browser to refuse cookies from our website, with the
              understanding that we may be unable to provide you with some of your desired service without them. This policy covers only the
              use of cookies between your computer and our website; it does not cover the use of cookies by any advertisers.
            </p>
            <h3>Third-Party Services</h3>
            <p>
              We may employ third-party companies and individuals on our websites - for example, analytics providers and content partners.
              These third parties have access to your personal information only to perform specific tasks on our behalf, and are obligated
              not to disclose or use it for any other purpose.
            </p>
            <h3>Security</h3>
            <p>
              We take security seriously, and do what we can within commercially acceptable means to protect your personal information from
              loss or theft, as well as unauthorized access, disclosure, copying, use or modification. That said, we advise that no method
              of electronic transmission or storage is 100% secure, and cannot guarantee the absolute security of your data.
            </p>
            <h3>Links to Other Sites</h3>
            <p>
              Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content
              and practices of these sites, and cannot assume responsibility for their treatment of your personal information. This privacy
              policy only covers our website and privacy practices.
            </p>
            <h3>Children’s Privacy</h3>
            <p>
              We do not knowingly collect or store personal information from children (visitors under the age of 13). If you believe your
              child has provided us with personal information, we encourage you to contact us immediately, and we will do our best to delete
              the data as quickly as possible.
            </p>
            <h3>Changes to our Privacy Policy</h3>
            <p>
              At our discretion, we may change our privacy policy from time to time. Any changes will be reflected here, so we encourage you
              to visit this page regularly. Your continued use of this site after any changes to this policy will be regarded as acceptance
              of our practices around privacy and personal information.
            </p>
            <h3>Business Transfers</h3>
            <p>
              If we or our assets are acquired, or in the unlikely event that we go out of business or enter bankruptcy, we would include
              user information among our assets transferred to or acquired by a third party. You acknowledge that such transfers may occur,
              and that any parties who acquire us may continue to use your personal information according to this policy.
            </p>
            <h3>Email Sharing</h3>
            <p>
              By creating an account with ConnSuite you accept to be automatically subscribed to our user list and you will receive updates
              from and about this service. We will not disclose and/or share your email account with any third party and you will be able to
              un-subscribe at any time from our emailing list.
            </p>
          </div>
        </div>
      </Main>
    </Page>
  );
}

export default Terms;
