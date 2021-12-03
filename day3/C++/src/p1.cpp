#include <iostream>
#include <fstream>
#include <vector>
#include <cmath>
#include "reduce.h"

int main()
{
    std::string filename("data/data.txt");
    std::vector<std::string> lines;
    std::string line;
    std::ifstream input_file(filename);

    while (getline(input_file, line))
    {
        lines.push_back(line);
    }
    int gamma = 0;
    for (int i = 0; i < 12; i++)
    {
        gamma = gamma + reduce_i(lines, i) * std::pow(2, (11 - i));
    }
    int res = gamma * (std::pow(2, 12) - gamma);
    std::cout << res << std::endl;
    input_file.close();
    return EXIT_SUCCESS;
}