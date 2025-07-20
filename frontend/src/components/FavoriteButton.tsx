import { IconButton, Tooltip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useFavoriteEmployees } from "./useFavoriteEmployees";

type FavoriteButtonProps = {
  employeeId: string;
};

export function FavoriteButton({ employeeId }: FavoriteButtonProps) {
  const { favorite, addFavorite, removeFavorite, isFavorite } =
    useFavoriteEmployees();

  const toggleFavorite = (e: React.MouseEvent) => {
    if (isFavorite(employeeId)) {
      removeFavorite(employeeId);
    } else {
      addFavorite(employeeId);
    }
    e.stopPropagation(); // 親のクリックなどを防ぐ
  };

  return (
    <Tooltip title={favorite ? "スター解除" : "スター登録"}>
      <IconButton
        onClick={toggleFavorite}
        aria-label="favorite"
        color={favorite ? "warning" : "default"}
      >
        {favorite ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
    </Tooltip>
  );
}
