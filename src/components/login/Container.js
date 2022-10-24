export default function Container({ children }) {
    return (
        <div className="w-3/4 absolute -mt-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-full ">{children}</div>
        </div>
    );
}
