import { User } from '../../../core/domain/user.model';

export const registrationTemplate = (user: User, message: string): string => {
  return `
  <div
      style="
        padding: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #eeeff8;
      "
    >
      <div
        style="
          width: 30vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        "
      >
        <tbody>
          <tr align="middle">
            <td style="padding-top: 30px; padding-bottom: 32px">
              <img
                src="https://ci3.googleusercontent.com/proxy/gfpX5zHcPSkMAKJWme-S01I65bNyGtbT445gbpIjhCNg_fbOBLj0Pai2g_IuVsEofeH9rldbshOYhtV3YNDCZsuHr5r_HW5TiJySYXAW1w=s0-d-e1-ft#https://ok14static.oktacdn.com/fs/bco/1/fs0cyinkkGttXAq5D696"
                height="37"
                class="CToWUd"
                style="margin: 10px"
              />
            </td>
          </tr>
          <tr bgcolor="#ffffff">
            <td>
              <table
                bgcolor="#ffffff"
                style="
                  width: 100%;
                  line-height: 20px;
                  padding: 32px;
                  border: 1px solid;
                  border-color: #f0f0f0;
                "
                cellpadding="0"
              >
                <tbody>
                  <tr>
                    <td
                      style="color: #5e5e5e; font-size: 22px; line-height: 22px"
                    >
                      Job and Talent, SL - Welcome to Our Company!
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 24px; vertical-align: bottom">
                      Hi ${user.email},
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 24px">
                      ${message}
                      <a
                        href="https://www.okta.com/intro-to-okta/"
                        style="color: #007dc1; text-decoration: none"
                        target="_blank"
                        data-saferedirecturl="https://www.jobandtalent.com"
                        ><span style="color: #007dc1; text-decoration: none"
                          >https://www.jobandtalent.<wbr />com</span
                        ></a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 24px">
                      HQ Helpdesk has created a user account for you.<br />
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 24px">
                      If you experience difficulties accessing your account, you
                      can send a help request to your system administrator using
                      the link:
                      <a
                        href="https://jobandtalent.freshservice.com/support/home"
                        style="color: #007dc1; text-decoration: none"
                        target="_blank"
                        data-saferedirecturl="https://www.google.com/url?q=https://jobandtalent.freshservice.com/support/home&amp;source=gmail&amp;ust=1651911451920000&amp;usg=AOvVaw2HGqxjltGeVFXeko-F1Z1t"
                        ><span style="color: #007dc1; text-decoration: none"
                          >https://jobandtalent.<wbr />freshservice.com/support/home</span
                        ></a
                      >
                      <img
                        src="https://st.depositphotos.com/1969477/1871/v/600/depositphotos_18714827-stock-illustration-welcome.jpg"
                        alt=""
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </div>
    </div>
  `;
};
