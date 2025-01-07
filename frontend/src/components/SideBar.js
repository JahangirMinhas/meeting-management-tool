import Link from "next/link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MeetingsIcon from "@mui/icons-material/GroupsRounded";
import TasksIcon from "@mui/icons-material/FormatListBulletedRounded";
import SettingsIcon from "@mui/icons-material/SettingsRounded";
import PlusIcon from "@mui/icons-material/AddRounded";

const SideBar = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="h-screen w-20 flex flex-col bg-primary text-textPrimary">
                <NavButton href="/" icon={<HomeRoundedIcon />} name="Home" />
                <NavButton href="/meetings" icon={<MeetingsIcon />} name="Meetings" />
                <NavButton href="/tasks" icon={<TasksIcon />} name="Tasks" />
                <NavButton href="/settings" icon={<SettingsIcon />} name="Settings" />
            </div>

            {/* Panel */}
            <div className="w-80 bg-secondary h-screen p-4 shadow-md flex flex-col items-center gap-5">
                <h1 className="text-lg font-bold text-white">Meeting Summarizer</h1>
                <button className="bg-highlight hover:bg-[#36f5b6] p-3 rounded-md w-60">
                    <div className="flex flex-row justify-center items-center gap-2 text-white font-semibold">
                        <PlusIcon />
                        Start a Meeting
                    </div>
                </button>
            </div>
        </div>
    );
};

const NavButton = ({ href, icon, name }) => {
    return (
        <Link href={href} className="flex flex-col items-center mt-5 mb-5 text-sm p-2">
            <div className="sidebar-icon">{icon}</div>
            <span>{name}</span>
        </Link>
    );
};

export default SideBar;