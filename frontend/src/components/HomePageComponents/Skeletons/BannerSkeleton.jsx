import { Skeleton } from "@mui/material";
import styles from "./Skeleton.module.scss";

const BannerSkeleton = () => {
  return (
    <div className={styles.bannerSkeletonContainer}>
      <Skeleton
        variant="rounded"
        width={100}
        height={15}
        sx={{ bgcolor: "grey.300" }}
        animation={false}
      />
      <Skeleton
        variant="rectangular"
        width={210}
        height={25}
        sx={{ bgcolor: "grey.100" }}
        animation={false}
      />
      <Skeleton
        variant="rectangular"
        width={210}
        height={20}
        sx={{ bgcolor: "grey.100" }}
        animation={false}
      />

      <Skeleton
        sx={{
          position: "absolute",
          top: 12,
          left: -10,
          bgcolor: "var(--light-purple)",
          border: "1.23px solid #e9d5ff",
        }}
        variant="rounded"
        width={260}
        height={30}
        animation={false}
      />
    </div>
  );
};

export default BannerSkeleton;
