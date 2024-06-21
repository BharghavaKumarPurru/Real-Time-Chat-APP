using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FormulaOne.ChatService.Models;

namespace FormulaOne.ChatService.DataService
{
    public class SharedDb
    {
        private readonly ConcurrentDictionary<string,UserConnection> _connections= new ConcurrentDictionary<string, UserConnection>();
        public ConcurrentDictionary<string,UserConnection> connections=>_connections;
    }
}