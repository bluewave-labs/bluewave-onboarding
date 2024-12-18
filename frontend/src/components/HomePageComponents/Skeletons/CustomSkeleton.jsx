import { Skeleton } from "@mui/material";
import styles from "./Skeleton.module.scss";

const CustomSkeleton = ({ items = 4, frontSkeletonProps = {} }) => {
  return (
    <div className={styles.skeletonContainer}>
      {[...Array(items)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          width={210}
          height={20}
          animation={false}
          sx={{ bgcolor: "var(--gray-250)" }}
        />
      ))}

      <Skeleton
        className="childSkeleton"
        variant={frontSkeletonProps?.variant || "rounded"}
        width={100}
        height={50}
        animation={false}
        sx={{
          ...frontSkeletonProps,
          bgcolor: "var(--blue-50)",
        }}
      />
    </div>
  );
};

export default CustomSkeleton;
