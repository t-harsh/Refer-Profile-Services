// https://fluentsite.z22.web.core.windows.net/quick-start
import { Provider, teamsTheme, Loader } from "@fluentui/react-northstar";
import { HashRouter as Router, Redirect, Route } from "react-router-dom";
import { useTeamsFx } from "@microsoft/teamsfx-react";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import "./App.css";
import TabConfig from "./TabConfig";
import { TeamsFxContext } from "./Context";
import { PageLayout } from "./PageLayout";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import Button from "react-bootstrap/Button";
import { ProfileContent } from "./ProfileContent";
import { ProfileData } from "./ProfileData";
import { callMsGraph } from "./graph";

export default function App() {
  const { loading, theme, themeString, teamsfx } = useTeamsFx();
  return (

    <TeamsFxContext.Provider value={{ theme, themeString, teamsfx }}>
      <PageLayout>
        <div className="App">
          <AuthenticatedTemplate>
            <ProfileContent />

            <Provider theme={theme || teamsTheme} styles={{ backgroundColor: "#eeeeee" }}>

              <Router>
                <Route exact path="/">
                  <Redirect to="/tab" />
                </Route>
                {loading ? (
                  <Loader style={{ margin: 100 }} />
                ) : (
                  <>
                    <Route exact path="/privacy" component={Privacy} />
                    <Route exact path="/termsofuse" component={TermsOfUse} />
                    <Route exact path="/tab" component={Tab} />
                    <Route exact path="/config" component={TabConfig} />
                  </>
                )}

              </Router>

            </Provider>

          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <p className="card-title">You are not signed in! Please sign in.</p>
          </UnauthenticatedTemplate>
        </div>
      </PageLayout>
    </TeamsFxContext.Provider>
  );
}

