import React from 'react'
import Link from "next/link";
import {AdjustmentsHorizontalIcon} from "@heroicons/react/24/outline";

interface IProps {
    home: boolean
}
const Header: React.FC<IProps> = ({ home }) => <header>
    <div className="navbar bg-base-100 px-6">
        <div className="flex-1">
            {
                home
                    ? <span className="normal-case text-xl">Mes postes ENM</span>
                    : <Link href="/" className="normal-case text-xl" >Mes postes ENM</Link>
            }
        </div>

        <label htmlFor="drawer" className="drawer-button cursor-pointer"><AdjustmentsHorizontalIcon className="h-6 w-6" /></label>
    </div>
</header>

export default Header