import { Skeleton } from "@mui/material";
import styles from "./Skeleton.module.scss";

const BaseSkeleton = ({ items = 4, frontSkeletonProps = {} }) => {

    const skeletonStyles = { bgcolor: "var(--gray-200)", borderRadius: "3.12px" };

  return (
    <div className={styles.skeletonContainer}>
      {[...Array(items)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          width={210}
          height={18}
          animation={false}
          sx={skeletonStyles}
          />
      ))}

      <Skeleton
        className="childSkeleton"
        variant={frontSkeletonProps?.variant || "rounded"}
        width={frontSkeletonProps?.width || 100}
        height={frontSkeletonProps?.height || 50}
        animation={false}
        sx={{
          ...frontSkeletonProps,
          bgcolor: "var(--blue-50)",
        }}
      />
    </div>
  );
};

export default BaseSkeleton;
