import Link from "next/link";
const Card = ({ problem }) => {
    const { title, name, date, _id } = problem;
    const tags = problem.tag || [];
    console.log(title, name, date, tags);
    const currentTime = new Date();
    const problemTime = new Date(date);
    const timeDifference = Math.abs(currentTime - problemTime);
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesDifference = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    let timeAgo = `${daysDifference} days ago`;
    if (daysDifference == 0 && hoursDifference == 0 && minutesDifference < 2) {
        timeAgo = `Just Now`;
    } else if (daysDifference == 0 && hoursDifference == 0) {
        timeAgo = `${minutesDifference} minutes ago`;
    } else if (daysDifference == 0) {
        timeAgo = `${hoursDifference} hours ago`;
    }

    return (
        <Link
            href={`question/${_id}`}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 my-1"
        >
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h6 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h6>
                <div className="flex flex-wrap mt-0">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-small font-medium me-2 px-2.5 py-1.5 rounded dark:bg-blue-900 dark:text-blue-300 uppercase"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-center mt-4">
                    <div className="name text-2 font-medium dark:text-white">{name}</div>
                    <div className="asktime text-1 font-light  dark:text-gray-300">
                        - asked {timeAgo}
                    </div>
                </div>
            </div>
        </Link>
    );
};
export default Card;
