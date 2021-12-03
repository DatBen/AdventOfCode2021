#include <iostream>
#include <fstream>
#include <vector>

int reduce_i(std::vector<std::string> lines, int i)
{
    int compteur;
    int res[2];
    for (const auto &j : lines)
    {
        if (j[i] == '0')
        {
            res[0] = res[0] + 1
        }
        else
        {
            res[1] = res[1] + 1
        }
    }
    if (res[0] > res[1])
        return 0 return 1
};