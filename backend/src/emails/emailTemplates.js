export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ChitChat</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Poppins:wght@600;700;800&display=swap');
      
      .voxel-button {
        background: linear-gradient(180deg, #4CAF50 0%, #388E3C 100%);
        border: none;
        box-shadow: 
          0 0 0 2px #2E7D32,
          0 4px 0 #1B5E20,
          0 4px 8px rgba(0,0,0,0.3);
        transition: all 0.1s ease;
      }
      
      .voxel-button:hover {
        transform: translateY(2px);
        box-shadow: 
          0 0 0 2px #2E7D32,
          0 2px 0 #1B5E20,
          0 2px 4px rgba(0,0,0,0.3);
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #1a1a1a; font-family: 'Poppins', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1a1a1a;">
      <tr>
        <td align="center" style="padding: 20px 10px;">
          
          <!-- Main Container -->
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #1a1a1a;">
            
            <!-- Pixel Border Top - Grass Block Style -->
            <tr>
              <td style="padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="background-color: #8BC34A; height: 4px;"></td>
                  </tr>
                  <tr>
                    <td style="background-color: #66BB6A; height: 4px;"></td>
                  </tr>
                  <tr>
                    <td style="background-color: #4CAF50; height: 4px;"></td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Hero Section with Voxel Aesthetic -->
            <tr>
              <td style="background: linear-gradient(180deg, #2E7D32 0%, #1B5E20 60%, #0D3B14 100%); padding: 0; position: relative;">
                <!-- Subtle Grid Pattern Overlay -->
                <div style="background-image: repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(0,0,0,0.05) 15px, rgba(0,0,0,0.05) 16px), repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(0,0,0,0.05) 15px, rgba(0,0,0,0.05) 16px); padding: 50px 30px;">
                  
                  <!-- Logo Container with Voxel Depth -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" style="padding-bottom: 25px;">
                        <div style="display: inline-block; background: linear-gradient(135deg, #26C6DA 0%, #00ACC1 100%); padding: 4px; box-shadow: 0 0 0 3px #00838F, 0 6px 0 #006064, 0 8px 16px rgba(0,0,0,0.4);">
                          <div style="background-color: #ffffff; padding: 16px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);">
                            <img src="https://i.postimg.cc/TPKxqzvt/logo.png" alt="ChitChat" width="80" height="80" style="display: block; image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;">
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center">
                        <h1 style="margin: 0; color: #FFFFFF; font-size: 42px; font-weight: 900; font-family: 'Orbitron', sans-serif; letter-spacing: 3px; text-shadow: 3px 3px 0 #1B5E20, 5px 5px 0 #0D3B14, 6px 6px 12px rgba(0,0,0,0.5); text-transform: uppercase; line-height: 1.2;">
                          CHITCHAT
                        </h1>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-top: 20px;">
                        <div style="display: inline-block; background: linear-gradient(90deg, #FDD835 0%, #FBC02D 100%); padding: 10px 24px; box-shadow: 0 0 0 2px #F9A825, 0 3px 0 #F57F17, 0 4px 8px rgba(0,0,0,0.3);">
                          <span style="color: #3E2723; font-size: 13px; font-weight: 800; letter-spacing: 1px; text-shadow: 0 1px 0 rgba(255,255,255,0.5);">✨ WELCOME TO THE CREW</span>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            
            <!-- Main Content Area -->
            <tr>
              <td style="background-color: #E8F5E9; padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding: 40px 35px;">
                      
                      <!-- Greeting Block with Dirt-Style Border -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 25px;">
                        <tr>
                          <td style="background: linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%); padding: 3px; box-shadow: 0 0 0 3px #795548, 0 4px 0 #5D4037, 0 5px 12px rgba(0,0,0,0.2);">
                            <div style="background-color: #FFFFFF; padding: 20px 25px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);">
                              <p style="margin: 0; font-size: 22px; font-weight: 800; color: #00838F; letter-spacing: 0.5px;">Hi ${name}! 👋</p>
                            </div>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Main Message -->
                      <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 1.7; color: #2E4A2B; font-weight: 600;">
                        Thanks for joining <span style="color: #00838F; font-weight: 800;">ChitChat</span>! Your workspace for seamless communication is all set up. Whether you're collaborating on a group project or just catching up with a friend, we're here to make it easier.
                      </p>
                      
                      <!-- Feature Box - Stone Gray Style -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 35px 0;">
                        <tr>
                          <td style="background: linear-gradient(180deg, #616161 0%, #424242 100%); padding: 3px; box-shadow: 0 0 0 3px #212121, 0 6px 0 #000000, 0 8px 16px rgba(0,0,0,0.4);">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #E0E0E0;">
                              <tr>
                                <td style="padding: 25px;">
                                  <!-- Title -->
                                  <div style="margin-bottom: 20px;">
                                    <span style="font-size: 18px; font-weight: 800; color: #212121; letter-spacing: 1px;">⛏️ READY TO START?</span>
                                  </div>
                                  
                                  <!-- Feature Items with Grass Block Style -->
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
                                    <tr>
                                      <td style="background: linear-gradient(180deg, #81C784 0%, #66BB6A 100%); padding: 2px; box-shadow: 0 0 0 2px #4CAF50, 0 3px 0 #388E3C;">
                                        <div style="background-color: #FFFFFF; padding: 14px 16px;">
                                          <p style="margin: 0; color: #1B5E20; font-weight: 700; font-size: 15px;">
                                            <span style="color: #00838F; font-weight: 900;">💬 Chat:</span> Start a private conversation or create a study group.
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
                                    <tr>
                                      <td style="background: linear-gradient(180deg, #4DB6AC 0%, #26A69A 100%); padding: 2px; box-shadow: 0 0 0 2px #00897B, 0 3px 0 #00695C;">
                                        <div style="background-color: #FFFFFF; padding: 14px 16px;">
                                          <p style="margin: 0; color: #004D40; font-weight: 700; font-size: 15px;">
                                            <span style="color: #00838F; font-weight: 900;">📎 Share:</span> Drop images, docs, or ZIP files directly into the chat.
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="background: linear-gradient(180deg, #FFB74D 0%, #FFA726 100%); padding: 2px; box-shadow: 0 0 0 2px #FB8C00, 0 3px 0 #EF6C00;">
                                        <div style="background-color: #FFFFFF; padding: 14px 16px;">
                                          <p style="margin: 0; color: #E65100; font-weight: 700; font-size: 15px;">
                                            <span style="color: #00838F; font-weight: 900;">🔍 Search:</span> Find any past message or file instantly.
                                          </p>
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
                      
                      <!-- CTA Voxel Button -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 40px 0 30px 0;">
                        <tr>
                          <td align="center">
                            <table cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td style="background: linear-gradient(180deg, #4CAF50 0%, #388E3C 100%); padding: 3px; box-shadow: 0 0 0 3px #2E7D32, 0 6px 0 #1B5E20, 0 8px 16px rgba(0,0,0,0.4);">
                                  <a href="${clientURL}" style="display: block; background: linear-gradient(180deg, #66BB6A 0%, #4CAF50 100%); color: #FFFFFF; text-decoration: none; padding: 18px 50px; font-weight: 900; font-size: 17px; letter-spacing: 2px; text-shadow: 2px 2px 0 #2E7D32, 3px 3px 4px rgba(0,0,0,0.3); text-transform: uppercase; font-family: 'Orbitron', sans-serif;">
                                    🎮 START NOW
                                  </a>
                                </td>
                              </tr>
                            </table>
                            <p style="margin: 15px 0 0 0; font-size: 13px; color: #558B2F; font-weight: 700; font-style: italic;">Your first conversation is just a click away!</p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Divider with Voxel Style -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 35px 0 30px 0;">
                        <tr>
                          <td style="background: linear-gradient(90deg, transparent 0%, #BDBDBD 20%, #BDBDBD 80%, transparent 100%); height: 4px; box-shadow: 0 2px 0 #9E9E9E;"></td>
                        </tr>
                      </table>
                      
                      <!-- Closing Message -->
                      <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #2E4A2B; font-weight: 600;">
                        We're excited to have you in the ChitChat community. If you have any questions or need help getting started, we're always here for you!
                      </p>
                      
                      <p style="margin: 5px 0; font-size: 15px; color: #2E4A2B; font-weight: 800;">Best,</p>
                      <p style="margin: 5px 0; font-size: 16px; color: #00838F; font-weight: 900; letter-spacing: 0.5px;">Team ChitChat 💚</p>
                      
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Pixel Border Bottom - Reverse Grass -->
            <tr>
              <td style="padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="background-color: #4CAF50; height: 4px;"></td>
                  </tr>
                  <tr>
                    <td style="background-color: #66BB6A; height: 4px;"></td>
                  </tr>
                  <tr>
                    <td style="background-color: #8BC34A; height: 4px;"></td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Footer with Stone Block Style -->
            <tr>
              <td style="background: linear-gradient(180deg, #424242 0%, #212121 100%); padding: 35px 30px; box-shadow: inset 0 4px 8px rgba(0,0,0,0.3);">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center">
                      <p style="margin: 0 0 15px 0; color: #9E9E9E; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">© 2025 ChitChat. All rights reserved.</p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom: 15px;">
                      <a href="#" style="color: #26A69A; text-decoration: none; margin: 0 10px; font-size: 13px; font-weight: 700;">Privacy Policy</a>
                      <span style="color: #616161; font-weight: 800;">|</span>
                      <a href="#" style="color: #26A69A; text-decoration: none; margin: 0 10px; font-size: 13px; font-weight: 700;">Terms</a>
                      <span style="color: #616161; font-weight: 800;">|</span>
                      <a href="#" style="color: #26A69A; text-decoration: none; margin: 0 10px; font-size: 13px; font-weight: 700;">Contact</a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <div style="display: inline-block; background: linear-gradient(90deg, #616161 0%, #757575 100%); padding: 8px 16px; box-shadow: 0 0 0 2px #424242, 0 2px 0 #212121;">
                        <span style="color: #E0E0E0; font-size: 11px; font-weight: 700; letter-spacing: 0.5px;">Built with ❤️ for seamless communication</span>
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