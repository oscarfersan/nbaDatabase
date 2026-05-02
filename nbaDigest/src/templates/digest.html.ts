import { Game } from '../types/index';

export function buildDigestHtml(games: Game[]): string {
  if (games.length === 0) {
    return `<p style="font-family: sans-serif; color: #333;">No games were played today.</p>`;
  }

  const rows = games.map(game => {
    const homeScore = game.home_team_score;
    const visitorScore = game.visitor_team_score;
    const homeWon = homeScore > visitorScore;
    const visitorWon = visitorScore > homeScore;

    const homeStyle = homeWon ? 'font-weight: bold; color: #000;' : 'color: #555;';
    const visitorStyle = visitorWon ? 'font-weight: bold; color: #000;' : 'color: #555;';

    return `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <span style="${homeStyle}">${game.home_team.full_name}</span>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
          <span style="${homeStyle}">${homeScore}</span> - <span style="${visitorStyle}">${visitorScore}</span>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
          <span style="${visitorStyle}">${game.visitor_team.full_name}</span>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>NBA Daily Digest</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="background-color: #1d428a; padding: 20px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 24px;">🏀 NBA Daily Digest</h1>
        </div>
        <div style="padding: 20px;">
          <h2 style="font-size: 18px; margin-top: 0; border-bottom: 2px solid #eee; padding-bottom: 10px;">Today's Results</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
        <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          <p style="margin: 0;">You are receiving this because you subscribed to the NBA Daily Digest.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
