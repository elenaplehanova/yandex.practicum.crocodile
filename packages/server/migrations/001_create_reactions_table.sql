CREATE TABLE IF NOT EXISTS reactions (
  id SERIAL PRIMARY KEY,
  emoji VARCHAR(10) NOT NULL,
  user_id INTEGER NOT NULL,
  comment_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, comment_id, emoji)
);

CREATE INDEX IF NOT EXISTS idx_reactions_comment_id ON reactions(comment_id);
CREATE INDEX IF NOT EXISTS idx_reactions_user_id ON reactions(user_id);

