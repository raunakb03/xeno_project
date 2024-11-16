export default function BreadCrum({ text, Icon }: any) {
    return (
        <>
            <div className="flex items-center space-x-2 text-gray-400">
                <Icon className="icon_size_20" />
                <span className="text-[18px]">/</span>
                <span className="text-[18px]">{text}</span>
            </div>
            <h1 className="text-[30px] font-bold text-gray-500">{text}</h1>
        </>
    );
}
