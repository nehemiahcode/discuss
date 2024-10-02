import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface TabVariant {
    tab: string;
    tabName: string;
    name: string;
    tabCount?: number;
}

interface UseValidateTabProps {
    tabVariants: TabVariant[];
    selectedTabs: string;
    fallbackRoute: string;
}

export const useValidateTab = ({ tabVariants, selectedTabs, fallbackRoute }: UseValidateTabProps) => {
    const router = useRouter();

    // Determine if the selected tab is valid
    const isValidTab = tabVariants.some(tab => tab.tabName === selectedTabs);

    useEffect(() => {
        if (!isValidTab) {
            // Redirect to the fallback route if the current tab is invalid
            router.push(fallbackRoute);
        }
    }, [isValidTab, router, fallbackRoute]);

    // Return the current valid tab or fallback to a default tab
    const currentTab = isValidTab ? selectedTabs : tabVariants[0]?.tabName;

    return currentTab;
};
