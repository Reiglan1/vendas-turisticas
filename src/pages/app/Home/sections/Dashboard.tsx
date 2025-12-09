import DashboardImg from "@/assets/images/dashboard.webp";

export default function Dashboard() {
    return (
        <div className="w-full">
            <img className="w-full object-cover" src={DashboardImg} alt="Dashboard" />
        </div>
    );
}