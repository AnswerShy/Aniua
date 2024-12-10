'use client'

interface CustomTitleProps {
    title: string;
}


const CustomTitle: React.FC<CustomTitleProps> = ({ title }) => {
    return (
        <h1 className="title scale-y-150">{title}</h1>
    );
};

export default CustomTitle;
