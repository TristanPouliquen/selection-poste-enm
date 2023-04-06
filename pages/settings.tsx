import React from "react";
import Layout from "@/components/layout";
import SettingsMenu from "@/components/Settings/menu";
import AppealCourtColor from "@/components/Settings/appeal_court_color";
import RoleColor from "@/components/Settings/role_color";
import GroupColor from "@/components/Settings/group_color";
import TimeWindows from "@/components/Settings/time_windows";
import Tags from "@/components/Settings/tags";
import DangerZone from "@/components/Settings/danger_zone";

export default function Settings() {
  return (
    <Layout home={false}>
      <SettingsMenu />
      <div className="grow p-6 relative">
        <Tags />
        <div className="divider"></div>
        <TimeWindows />
        <div className="divider"></div>
        <h1 className="text-2xl font-bold mb-4">Gérer les codes couleur</h1>

        <GroupColor />
        <div className="divider"></div>
        <RoleColor />
        <div className="divider"></div>
        <AppealCourtColor />
        <div className="divider"></div>
        <DangerZone />
      </div>
    </Layout>
  );
}
