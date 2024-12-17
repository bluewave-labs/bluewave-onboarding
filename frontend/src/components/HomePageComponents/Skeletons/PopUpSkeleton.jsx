import { Skeleton } from "@mui/material";
import styles from "./Skeleton.module.scss";

const PopUpSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <Skeleton
        variant="rectangular"
        width={210}
        height={30}
        sx={{ bgcolor: "grey.100" }}
        animation={false}
      />
      <Skeleton
        variant="rectangular"
        width={210}
        height={30}
        sx={{ bgcolor: "grey.100" }}
        animation={false}
      />
      <Skeleton
        variant="rectangular"
        width={210}
        height={30}
        sx={{ bgcolor: "grey.100" }}
        animation={false}
      />
      <Skeleton
        variant="rectangular"
        width={210}
        height={30}
        sx={{ bgcolor: "grey.100" }}
        animation={false}
      />
      <Skeleton
        sx={{
          position: "absolute",
          top: 20,
          left: 30,
          bgcolor: "var(--light-purple)",
          border: "0.5px solid #e9d5ff",
        }}
        variant="rounded"
        width={100}
        height={50}
        animation={false}
      />
    </div>
  );
};

export default PopUpSkeleton;
