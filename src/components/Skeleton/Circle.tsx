

const Circle = ({className, ...other}) => {
    return (
        <div class={"skeleton-circle " + className} {...other}>
            
        </div>
    );
};

export default Circle;