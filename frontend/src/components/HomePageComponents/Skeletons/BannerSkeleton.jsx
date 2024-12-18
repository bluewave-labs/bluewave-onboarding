import { Skeleton } from "@mui/material";
import styles from "./Skeleton.module.scss";

const BannerSkeleton = () => {
  return (
    <div className={styles.bannerSkeletonContainer}>
      <Skeleton
        variant="rounded"
        width={80}
        height={10}
        sx={{ bgcolor: "grey.300" }}
        animation={false}
      />

      <Skeleton
        variant="rounded"
        width={210}
        height={25}
        sx={{ bgcolor: "var(--gray-250)" }}
        animation={false}
      />

      <Skeleton
        variant="rounded"
        width={210}
        height={20}
        sx={{ bgcolor: "var(--gray-250)" }}
        animation={false}
      />

      <Skeleton
        className="childSkeleton"
        sx={{
          position: "absolute",
          top: 12,
          left: -10,
          bgcolor: "var(--blue-50)",
        }}
        variant="rounded"
        width={260}
        height={20}
        animation={false}
      />
    </div>
  );
};

export default BannerSkeleton;
