import {AdminBurgerMenu} from "@/pages/admin/components/AdminBurgerMenu";

export const Header = () => {


    return (
        <div className="admin-header">
            <AdminBurgerMenu/>
            <h2>Admin Dashboard</h2>
        </div>
    )
}