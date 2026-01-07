export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ChitChat</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto:wght@500;700;900&display=swap');
    </style>
  </head>
  <body style="margin: 0; padding: 20px 0; background: #1a1a1a; font-family: 'Roboto', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #1a1a1a;">
      <tr>
        <td align="center">
          
          <!-- Main Container with 9-slice border -->
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background: #2c2c2c; box-shadow: 0 0 0 4px #8b4513, 0 0 0 8px #654321, 0 12px 24px rgba(0,0,0,0.7);">
            
            <!-- Top Border (Wood texture) -->
            <tr>
              <td style="background: repeating-linear-gradient(90deg, #8b4513 0px, #8b4513 8px, #a0522d 8px, #a0522d 16px); height: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.4);"></td>
            </tr>
            
            <!-- Hero Section - Dark Stone Background -->
            <tr>
              <td style="background: linear-gradient(135deg, #383838 0%, #2a2a2a 50%, #1f1f1f 100%); padding: 0; position: relative;">
                <!-- Noise texture overlay -->
                <div style="background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px); padding: 50px 30px; border-bottom: 4px solid #1a1a1a;">
                  
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <!-- Logo with Item Slot style -->
                    <tr>
                      <td align="center" style="padding-bottom: 30px;">
                        <div style="display: inline-block; position: relative;">
                          <!-- Item slot shadow layers -->
                          <div style="background: #1a1a1a; padding: 6px; box-shadow: inset 2px 2px 0 rgba(0,0,0,0.8), inset -2px -2px 0 rgba(255,255,255,0.1), 0 6px 0 #0d0d0d;">
                            <div style="background: linear-gradient(135deg, #26a69a 0%, #00897b 100%); padding: 4px;">
                              <div style="background: #2a2a2a; padding: 12px; box-shadow: inset 0 2px 6px rgba(0,0,0,0.5);">
                                <img src="https://i.postimg.cc/TPKxqzvt/logo.png" alt="ChitChat" width="72" height="72" style="display: block; image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;">
                              </div>
                            </div>
                          </div>
                          <!-- Enchantment glint effect -->
                          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, transparent 30%, rgba(138,198,209,0.2) 50%, transparent 70%); pointer-events: none;"></div>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Title with Minecraft shadow -->
                    <tr>
                      <td align="center">
                        <h1 style="margin: 0; color: #55ff55; font-size: 36px; font-weight: 900; font-family: 'Press Start 2P', monospace; text-shadow: 3px 3px 0 #154515, 4px 4px 0 #0a2a0a, 5px 5px 8px rgba(0,0,0,0.8); letter-spacing: 2px; line-height: 1.4;">
                          CHITCHAT
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Welcome Badge -->
                    <tr>
                      <td align="center" style="padding-top: 25px;">
                        <div style="display: inline-block; background: #383838; padding: 2px; box-shadow: inset 2px 2px 0 rgba(0,0,0,0.5), inset -2px -2px 0 rgba(255,255,255,0.1), 0 4px 0 #1a1a1a;">
                          <div style="background: linear-gradient(180deg, #ffeb3b 0%, #fbc02d 100%); padding: 12px 28px; box-shadow: inset 0 -2px 0 rgba(0,0,0,0.2);">
                            <span style="color: #3e2723; font-size: 11px; font-weight: 900; letter-spacing: 1px; text-shadow: 0 1px 0 rgba(255,255,255,0.5); font-family: 'Press Start 2P', monospace;">✨ WELCOME TO THE CREW</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            
            <!-- Content Area - Grass texture background -->
            <tr>
              <td style="background: linear-gradient(180deg, #7cb342 0%, #689f38 50%, #558b2f 100%); padding: 0;">
                <!-- Grass pattern overlay -->
                <div style="background-image: repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px); padding: 40px 32px;">
                  
                  <!-- Greeting Card - Dirt Block Style -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
                    <tr>
                      <td style="background: #6d4c41; padding: 3px; box-shadow: 0 0 0 2px #4e342e, 0 6px 0 #3e2723, 0 8px 16px rgba(0,0,0,0.4);">
                        <div style="background: repeating-linear-gradient(45deg, #8d6e63 0px, #8d6e63 4px, #795548 4px, #795548 8px); padding: 2px;">
                          <div style="background: #fafafa; padding: 20px 24px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);">
                            <p style="margin: 0; font-size: 20px; font-weight: 900; color: #00897b; letter-spacing: 0.5px;">
                              <span style="color: #555; font-size: 16px; font-weight: 700;">›</span> Hi ${name}! 👋
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Message Text -->
                  <div style="background: rgba(255,255,255,0.95); padding: 24px; margin-bottom: 24px; box-shadow: 0 0 0 3px #558b2f, 0 4px 0 #33691e, 0 6px 12px rgba(0,0,0,0.3); border-radius: 2px;">
                    <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #2e2e2e; font-weight: 600;">
                      Thanks for joining <span style="color: #00897b; font-weight: 900;">ChitChat</span>! Your workspace for seamless communication is all set up. Whether you're collaborating on a group project or just catching up with a friend, we're here to make it easier.
                    </p>
                  </div>
                  
                  <!-- Feature Box - Stone Block Container -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background: linear-gradient(135deg, #616161 0%, #424242 100%); padding: 4px; box-shadow: 0 0 0 3px #2e2e2e, 0 8px 0 #1a1a1a, 0 10px 20px rgba(0,0,0,0.5);">
                        <div style="background: repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(0,0,0,0.1) 8px, rgba(0,0,0,0.1) 16px), repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.05) 8px, rgba(0,0,0,0.05) 16px); padding: 28px 24px; box-shadow: inset 0 3px 8px rgba(0,0,0,0.4);">
                          
                          <div style="margin-bottom: 20px; text-align: center;">
                            <span style="font-size: 14px; font-weight: 900; color: #ffeb3b; letter-spacing: 1px; text-shadow: 2px 2px 0 #1a1a1a, 3px 3px 4px rgba(0,0,0,0.5); font-family: 'Press Start 2P', monospace; display: inline-block; padding: 8px 16px; background: rgba(0,0,0,0.3);">HERE'S WHAT YOU CAN DO</span>
                          </div>
                          
                          <!-- Feature Items as inventory slots -->
                          <!-- Chat Feature -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
                            <tr>
                              <td style="background: #1a1a1a; padding: 2px; box-shadow: inset 2px 2px 0 rgba(0,0,0,0.8), inset -2px -2px 0 rgba(255,255,255,0.15);">
                                <div style="background: linear-gradient(135deg, #26a69a 0%, #00897b 100%); padding: 2px;">
                                  <div style="background: #e8f5e9; padding: 14px 16px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);">
                                    <p style="margin: 0; color: #1b5e20; font-weight: 800; font-size: 14px;">
                                      <span style="font-family: 'Press Start 2P', monospace; font-size: 12px; color: #00897b;">💬</span> <span style="color: #00897b; font-weight: 900;">Chat:</span> Start a private conversation or create a study group.
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- Share Feature -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
                            <tr>
                              <td style="background: #1a1a1a; padding: 2px; box-shadow: inset 2px 2px 0 rgba(0,0,0,0.8), inset -2px -2px 0 rgba(255,255,255,0.15);">
                                <div style="background: linear-gradient(135deg, #66bb6a 0%, #4caf50 100%); padding: 2px;">
                                  <div style="background: #e8f5e9; padding: 14px 16px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);">
                                    <p style="margin: 0; color: #1b5e20; font-weight: 800; font-size: 14px;">
                                      <span style="font-family: 'Press Start 2P', monospace; font-size: 12px; color: #4caf50;">📎</span> <span style="color: #4caf50; font-weight: 900;">Share:</span> Drop images, docs, or ZIP files directly into the chat.
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- Search Feature -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="background: #1a1a1a; padding: 2px; box-shadow: inset 2px 2px 0 rgba(0,0,0,0.8), inset -2px -2px 0 rgba(255,255,255,0.15);">
                                <div style="background: linear-gradient(135deg, #ffa726 0%, #fb8c00 100%); padding: 2px;">
                                  <div style="background: #e8f5e9; padding: 14px 16px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);">
                                    <p style="margin: 0; color: #1b5e20; font-weight: 800; font-size: 14px;">
                                      <span style="font-family: 'Press Start 2P', monospace; font-size: 12px; color: #fb8c00;">🔍</span> <span style="color: #fb8c00; font-weight: 900;">Search:</span> Find any past message or file instantly.
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                          
                        </div>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- CTA Button - Emerald Block Style -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 35px 0 25px 0;">
                    <tr>
                      <td align="center">
                        <table cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="background: #2e7d32; padding: 4px; box-shadow: 0 0 0 3px #1b5e20, 0 8px 0 #0d3b14, 0 10px 20px rgba(0,0,0,0.5);">
                              <a href="${clientURL}" style="display: block; text-decoration: none;">
                                <div style="background: linear-gradient(180deg, #66bb6a 0%, #4caf50 60%, #43a047 100%); padding: 20px 55px; box-shadow: inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.3); transition: all 0.2s;">
                                  <span style="color: #ffffff; font-weight: 900; font-size: 14px; letter-spacing: 2px; text-shadow: 2px 2px 0 #1b5e20, 3px 3px 0 #0d3b14, 4px 4px 6px rgba(0,0,0,0.5); font-family: 'Press Start 2P', monospace; display: block; line-height: 1.4;">
                                    ▶ JOIN NOW
                                  </span>
                                </div>
                              </a>
                            </td>
                          </tr>
                        </table>
                        <p style="margin: 12px 0 0 0; font-size: 11px; color: #1b3b1c; font-weight: 800; text-shadow: 0 1px 2px rgba(255,255,255,0.5); font-family: 'Press Start 2P', monospace;">Your first conversation is just a click away!</p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Closing Message -->
                  <div style="background: rgba(255,255,255,0.9); padding: 20px 24px; margin-top: 30px; box-shadow: 0 0 0 3px #558b2f, 0 4px 0 #33691e, 0 6px 12px rgba(0,0,0,0.3); border-top: 4px solid #7cb342;">
                    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #2e2e2e; font-weight: 600;">
                      We're excited to have you in the ChitChat community. If you have any questions or need help getting started, we're always here for you!
                    </p>
                    <p style="margin: 4px 0; font-size: 14px; color: #2e2e2e; font-weight: 800;">Best regards,</p>
                    <p style="margin: 4px 0; font-size: 15px; color: #00897b; font-weight: 900;">Team ChitChat 💚</p>
                  </div>
                  
                </div>
              </td>
            </tr>
            
            <!-- Bottom Border -->
            <tr>
              <td style="background: repeating-linear-gradient(90deg, #8b4513 0px, #8b4513 8px, #a0522d 8px, #a0522d 16px); height: 8px; box-shadow: 0 -2px 4px rgba(0,0,0,0.4);"></td>
            </tr>
            
            <!-- Footer - Bedrock Style -->
            <tr>
              <td style="background: linear-gradient(180deg, #2e2e2e 0%, #1a1a1a 100%); padding: 32px 24px; box-shadow: inset 0 4px 8px rgba(0,0,0,0.5);">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center">
                      <p style="margin: 0 0 12px 0; color: #757575; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; font-family: 'Press Start 2P', monospace; line-height: 1.6;">
                        © 2025 ChitChat
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom: 12px;">
                      <a href="#" style="color: #26a69a; text-decoration: none; margin: 0 8px; font-size: 11px; font-weight: 700; font-family: 'Press Start 2P', monospace;">Privacy</a>
                      <span style="color: #424242; font-weight: 900;">|</span>
                      <a href="#" style="color: #26a69a; text-decoration: none; margin: 0 8px; font-size: 11px; font-weight: 700; font-family: 'Press Start 2P', monospace;">Terms</a>
                      <span style="color: #424242; font-weight: 900;">|</span>
                      <a href="#" style="color: #26a69a; text-decoration: none; margin: 0 8px; font-size: 11px; font-weight: 700; font-family: 'Press Start 2P', monospace;">Contact</a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <div style="display: inline-block; background: #383838; padding: 2px; box-shadow: inset 2px 2px 0 rgba(0,0,0,0.5), inset -2px -2px 0 rgba(255,255,255,0.1);">
                        <div style="background: #2e2e2e; padding: 8px 16px;">
                          <span style="color: #9e9e9e; font-size: 9px; font-weight: 700; letter-spacing: 0.5px; font-family: 'Press Start 2P', monospace;">Built with ❤️</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
          </table>
          
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
