using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FormulaOne.ChatService.DataService;
using FormulaOne.ChatService.Models;
using Microsoft.AspNetCore.SignalR;

namespace FormulaOne.ChatService.Hubs
{
    public class ChatHub:Hub
    {
        private readonly SharedDb _shared;

        public ChatHub(SharedDb shared)
        {
            _shared=shared;
        }

        public async Task JoinChat(UserConnection conn)
        {
            await Clients.All.SendAsync("ReciveMessage","admin",$"{conn.userName} has joined");
        }
        
        public async Task JoinSpecificChatRoom(UserConnection conn)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId,conn.ChatRoom);

            _shared.connections[Context.ConnectionId]=conn;   
            
            await Clients.Group(conn.ChatRoom).SendAsync("RecieveSpecificMessage","admin",$"{conn.userName} has joined {conn.ChatRoom}");
        }
        public async Task SendMessage(string msg)
        {
            if(_shared.connections.TryGetValue(Context.ConnectionId,out UserConnection conn))
            {
                await Clients.Group(conn.ChatRoom)
                    .SendAsync("RecieveSpecificMessage",conn.userName,msg);
            }
        }
    }
}
