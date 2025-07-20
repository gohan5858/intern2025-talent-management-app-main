import { IconButton, Tooltip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useState } from "react";

export function FavoriteButton() {
  const [favorites, setFavorites] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    setFavorites(!favorites);
    e.stopPropagation(); // 親のクリックなどを防ぐ
  };

  return (
    <Tooltip title={favorites ? "スター解除" : "スター登録"}>
      <IconButton
        onClick={toggleFavorite}
        aria-label="favorite"
        color={favorites ? "warning" : "default"}
      >
        {favorites ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
    </Tooltip>
  );
}
