import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PortfolioSettingsForm from "./PortfolioSettingsForm";
import type {
    PortfolioSettings,
    UpdatePortfolioSettingsPayload,
} from "../types";

interface PortfolioSettingsCardProps {
    settings: PortfolioSettings | null;
    onSubmit: (
        values: UpdatePortfolioSettingsPayload
    ) => Promise<boolean>;
}

export default function PortfolioSettingsCard({
    settings,
    onSubmit,
}: PortfolioSettingsCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Portfolio Settings
                </CardTitle>
            </CardHeader>

            <CardContent>
                <PortfolioSettingsForm
                    initialData={settings}
                    onSubmit={onSubmit}
                />
            </CardContent>
        </Card>
    );
}