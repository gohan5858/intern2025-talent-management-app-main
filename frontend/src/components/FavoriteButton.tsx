import { IconButton, Tooltip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useState } from "react";

export function FavoriteButton() {
  const [favorite, setFavorite] = useState(false);

  const toggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setFavorite(!favorite);
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
