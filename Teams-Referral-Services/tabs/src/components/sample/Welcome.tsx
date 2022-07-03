import { useContext, useState } from "react";
import { Image, Menu } from "@fluentui/react-northstar";
import "./Welcome.css";
import { EditCode } from "./EditCode";
import { AzureFunctions } from "./AzureFunctions";
import { Graph } from "./Graph";
import { CurrentUser } from "./CurrentUser";
import { useData } from "@microsoft/teamsfx-react";
import { Deploy } from "./Deploy";
import { Publish } from "./Publish";
import { TeamsFxContext } from "../Context";

type Profile = {
  profileId: string;
  firstName: string;
  lastName: string;
  emailId: string;
  mobileNo: string;
  location: string;
  relation: string;
  exampleRadios1: boolean;
  exampleRadios2: boolean;
  about: string;
  code: string;
}

export function Welcome(props: { showFunction?: boolean; environment?: string }) {
  const { showFunction, environment } = {
    showFunction: true,
    environment: window.location.hostname === "localhost" ? "local" : "azure",
    ...props,
  };
  const friendlyEnvironmentName =
    {
      local: "local environment",
      azure: "Azure environment",
    }[environment] || "local environment";

  const steps = ["local", "azure", "publish"];
  const friendlyStepsName: { [key: string]: string } = {
    local: "1. Refer",
    azure: "2. Saved Profiles",
  };
  const [selectedMenuItem, setSelectedMenuItem] = useState("local");
  const items = steps.map((step) => {
    return {
      key: step,
      content: friendlyStepsName[step] || "",
      onClick: () => setSelectedMenuItem(step),
    };
  });

  const { teamsfx } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsfx) {
      const userInfo = await teamsfx.getUserInfo();
      return userInfo;
    }
  });
  const userName = (loading || error) ? "": data!.displayName;
  return (
    <div className="welcome page">
      <div className="narrow page-padding">
      <Image src="logo.svg" alt="logo.svg" />
        <h1 className="center">
          Welcome {userName ? "" + userName : ""} to the Career Portal!
        </h1>
        <p className="center">
          Choose below to Refer a friend or family or to Apply yourself for an opening.
        </p>
        <Menu defaultActiveIndex={0} items={items} underlined secondary />
        <div className="sections">
          {selectedMenuItem === "local" && (
            <div>
              <EditCode />
              <CurrentUser userName={userName} />
              <Graph />
            </div>
          )}
          {selectedMenuItem === "azure" && (
            <div>
              <Deploy/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
