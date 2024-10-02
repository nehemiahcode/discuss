import Link from 'next/link'

function TabsBtn({
    name,
    tab,
    tabName,
    tabCount,
    activeColor,
    notActiveColor,
}: {
    name: string,
    tab: string | undefined,
    tabName: string,
    tabCount?: number,
    activeColor: string,
    notActiveColor: string,
}) {


    return (
        <Link
            href={`?tab=${tabName}`}
            scroll={false}
            className={`satoshi ${tabName === tab ? `${activeColor} border-b-2` : `border-[#E4E7EC] ${notActiveColor}`} whitespace-nowrap outline-none  px-10 pt-3 pb-4 flex capitalize text-sm font-medium items-center text-center`}>
            <div className="flex items-center gap-x-2">
                {name}
                <span className={`bg-gray-200 ${tabCount === undefined && "hidden"} rounded-full flex items-center justify-center h-6 w-6`}>{tabCount}</span>
            </div>

        </Link>
    )
}

export default TabsBtn
