import "./Graph.css";
import { useGraph } from "@microsoft/teamsfx-react";
import { Providers, ProviderState } from '@microsoft/mgt-element';
import { TeamsFxProvider } from '@microsoft/mgt-teamsfx-provider';
import { Design } from './Design';
import { useContext } from "react";
import { TeamsFxContext } from "../Context";

export function Graph() {
  const { teamsfx } = useContext(TeamsFxContext);
  const { loading, error, data, reload } = useGraph(
    async (graph, teamsfx, scope) => {
      // Call graph api directly to get user profile information
      const profile = await graph.api("/me").get();

      // Initialize Graph Toolkit TeamsFx provider
      const provider = new TeamsFxProvider(teamsfx, scope);
      Providers.globalProvider = provider;
      Providers.globalProvider.setState(ProviderState.SignedIn);

      let photoUrl = "";
      try {
        const photo = await graph.api("/me/photo/$value").get();
        photoUrl = URL.createObjectURL(photo);
      } catch {
        // Could not fetch photo from user's profile, return empty string as placeholder.
      }
      return { profile, photoUrl };
    },
    { scope: ["User.Read"], teamsfx: teamsfx }
  );

  return (
    <div>
      <Design />
    </div>
  );
}
