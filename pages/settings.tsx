import { invoke } from '@tauri-apps/api/tauri'
import {useEffect, useState} from "react";
import Layout  from "@/components/layout";
import {AppealCourt} from "@/types/types";
import ColorPicker from "@/components/color_picker";

export default function Home() {
    const [appealCourts, setAppealCourts] = useState<AppealCourt[]>([])
    useEffect(() => {
        invoke<AppealCourt[]>('list_appeal_courts')
            .then(setAppealCourts)
            .catch(console.error)
    }, []);
    return (
        <Layout home={false}>
            <h1>Configurer les codes couleur</h1>
            <h2>Cours d'appel</h2>
            <ul>
                {appealCourts.map( (appealCourt: AppealCourt) => (
                    <li key={"colorpicker_appealCourt_" + appealCourt.id}>
                        <ColorPicker {...appealCourt} updateCallback={'update_appeal_court_color'} />
                    </li>
                ))}
            </ul>
        </Layout>
    )
}
