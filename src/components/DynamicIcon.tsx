'use client'

import { IconType } from 'react-icons'
import * as icons from 'react-icons/fa'

interface DynamicIconProps {
    iconName: string;
    className?: string;
}

const DynamicIcon = ({ iconName, className }: DynamicIconProps) => {
    const IconComponent = icons[iconName as keyof typeof icons] as IconType;
    
    if (!IconComponent) {
        return null;
    }

    return <IconComponent className={className} />;
};

export default DynamicIcon; 