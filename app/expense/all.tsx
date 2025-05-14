import { useExpenseContext } from "@/context/ExpenseContext";
import { Divider, Text, VStack, HStack, Input, Button, Select, Icon, Badge } from "@gluestack-ui/themed";
import React, { useEffect, useState, useMemo } from "react";
import { ScrollView, View, TouchableOpacity, ActivityIndicator } from "react-native";
import TransactionItem from "../../components/expenses/TransactionItem";
import { Search, Filter, ArrowUp, ArrowDown, X } from "lucide-react-native";

export default function AllTransactionsScreen() {
  const { transactionDisplay, fetchTransactions, onEdit, onDelete } = useExpenseContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date"); // date, amount, category
  const [sortOrder, setSortOrder] = useState("desc"); // asc, desc
  const [filterType, setFilterType] = useState("all"); // all, income, expense
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchTransactions();
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactionDisplay];
    
    // Apply type filter
    if (filterType !== "all") {
      filtered = filtered.filter(txn => txn.entryType.toLowerCase() === filterType);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(txn => 
        txn.category.toLowerCase().includes(term) ||
        txn.notes?.toLowerCase().includes(term) ||
        txn.accountType.toLowerCase().includes(term) ||
        txn.amount.toString().includes(term)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(`${a.dateTime.date} ${a.dateTime.time}`);
        const dateB = new Date(`${b.dateTime.date} ${b.dateTime.time}`);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } 
      else if (sortBy === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      } 
      else if (sortBy === "category") {
        const catA = a.category.toLowerCase();
        const catB = b.category.toLowerCase();
        return sortOrder === "asc" 
          ? catA.localeCompare(catB)
          : catB.localeCompare(catA);
      }
      return 0;
    });
    
    return filtered;
  }, [transactionDisplay, searchTerm, sortBy, sortOrder, filterType]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSortBy("date");
    setSortOrder("desc");
    setFilterType("all");
  };

  const renderFilterBadges = () => {
    const badges = [];
    
    if (filterType !== "all") {
      badges.push(
        <Badge key="type" className="mr-2 my-1" variant="outline" action="success">
          <HStack space="xs" alignItems="center">
            <Text className="text-xs">{filterType === "income" ? "Income" : "Expense"}</Text>
            <TouchableOpacity onPress={() => setFilterType("all")}>
              <Icon as={X} size="xs" />
            </TouchableOpacity>
          </HStack>
        </Badge>
      );
    }
    
    if (sortBy !== "date" || sortOrder !== "desc") {
      badges.push(
        <Badge key="sort" className="mr-2 my-1" variant="outline" action="info">
          <HStack space="xs" alignItems="center">
            <Text className="text-xs">
              Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} ({sortOrder === "asc" ? "↑" : "↓"})
            </Text>
            <TouchableOpacity onPress={() => { setSortBy("date"); setSortOrder("desc"); }}>
              <Icon as={X} size="xs" />
            </TouchableOpacity>
          </HStack>
        </Badge>
      );
    }
    
    return badges;
  };

  return (
    <View className="flex-1 bg-white">
      {/* Search and filter bar */}
      <View className="px-4 pt-4 pb-2 bg-gray-50">
        <HStack space="sm" alignItems="center" className="mb-3">
          <View className="flex-1 bg-white rounded-lg overflow-hidden">
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              className="bg-white border border-gray-200"
              leftElement={<Icon as={Search} size="sm" className="ml-2 text-gray-400" />}
              rightElement={
                searchTerm ? (
                  <TouchableOpacity onPress={() => setSearchTerm("")} className="mr-2">
                    <Icon as={X} size="sm" className="text-gray-400" />
                  </TouchableOpacity>
                ) : null
              }
            />
          </View>
          <TouchableOpacity 
            onPress={() => {
              // Show filter options modal or dropdown here
              // For simplicity, we'll just toggle between income/expense/all
              setFilterType(prev => {
                if (prev === "all") return "income";
                if (prev === "income") return "expense";
                return "all";
              });
            }}
            className="bg-white p-2 rounded-lg border border-gray-200"
          >
            <Icon as={Filter} size="sm" className={filterType !== "all" ? "text-blue-500" : "text-gray-400"} />
          </TouchableOpacity>
        </HStack>

        {/* Sort options */}
        <HStack space="sm" className="mb-2">
          <TouchableOpacity 
            onPress={() => setSortBy("date")}
            className={`py-1 px-3 rounded-full ${sortBy === "date" ? "bg-blue-100" : "bg-gray-100"}`}
          >
            <Text className={`text-xs ${sortBy === "date" ? "text-blue-700" : "text-gray-700"}`}>Date</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setSortBy("amount")}
            className={`py-1 px-3 rounded-full ${sortBy === "amount" ? "bg-blue-100" : "bg-gray-100"}`}
          >
            <Text className={`text-xs ${sortBy === "amount" ? "text-blue-700" : "text-gray-700"}`}>Amount</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setSortBy("category")}
            className={`py-1 px-3 rounded-full ${sortBy === "category" ? "bg-blue-100" : "bg-gray-100"}`}
          >
            <Text className={`text-xs ${sortBy === "category" ? "text-blue-700" : "text-gray-700"}`}>Category</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={toggleSortOrder}
            className="ml-1 py-1 px-2 rounded-full bg-gray-100"
          >
            <Icon as={sortOrder === "asc" ? ArrowUp : ArrowDown} size="xs" className="text-gray-700" />
          </TouchableOpacity>
          
          {(filterType !== "all" || searchTerm || sortBy !== "date" || sortOrder !== "desc") && (
            <TouchableOpacity 
              onPress={resetFilters}
              className="ml-auto py-1 px-3 rounded-full bg-gray-200"
            >
              <Text className="text-xs text-gray-700">Reset</Text>
            </TouchableOpacity>
          )}
        </HStack>

        {/* Active filter badges */}
        <HStack flexWrap="wrap">
          {renderFilterBadges()}
          {searchTerm && (
            <Badge className="mr-2 my-1" variant="outline" action="muted">
              <HStack space="xs" alignItems="center">
                <Text className="text-xs">Search: "{searchTerm}"</Text>
                <TouchableOpacity onPress={() => setSearchTerm("")}>
                  <Icon as={X} size="xs" />
                </TouchableOpacity>
              </HStack>
            </Badge>
          )}
        </HStack>
      </View>

      {/* Transaction list */}
      <ScrollView className="flex-1 px-4">
        {isLoading ? (
          <View className="py-10 flex items-center justify-center">
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text className="mt-2 text-gray-500">Loading transactions...</Text>
          </View>
        ) : filteredTransactions.length > 0 ? (
          <VStack space="sm" className="py-2">
            <HStack justifyContent="space-between" className="mb-1">
              <Text className="text-lg font-bold">Transactions</Text>
              <Text className="text-sm text-gray-500">{filteredTransactions.length} found</Text>
            </HStack>
            
            {filteredTransactions.map((txn, index) => (
              <VStack key={txn.id || index} className="bg-white rounded-lg my-1  shadow-sm">
                <TransactionItem
                  account={txn.accountType}
                  label={txn.category}
                  date={`${txn.dateTime.date}, ${txn.dateTime.time}`}
                  amount={txn.amount}
                  notes={txn.notes}
                  entryType={txn.entryType}
                  onDelete={() => onDelete(txn.id)}
                  onEdit={() => onEdit(txn.id)}
                />
              </VStack>
            ))}
          </VStack>
        ) : (
          <View className="py-16 flex items-center justify-center">
            <Text className="text-gray-400 mb-2">No transactions found</Text>
            <Text className="text-gray-400 text-sm text-center">
              {searchTerm || filterType !== "all" ? 
                "Try adjusting your search or filters" : 
                "Add some transactions to get started"}
            </Text>
            {(searchTerm || filterType !== "all") && (
              <TouchableOpacity 
                onPress={resetFilters}
                className="mt-4 py-2 px-4 bg-gray-200 rounded-lg"
              >
                <Text>Reset Filters</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        
        {/* Add some bottom padding for better scrolling experience */}
        <View className="h-20" />
      </ScrollView>
    </View>
  );
}